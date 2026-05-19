/**
 * Helper to handle streaming SSE responses from the backend.
 * Animates chunks character by character for smooth rendering.
 */

export async function handleStreamResponse(
    response: Response,
    onMeta: (data: any) => void,
    onChunk: (text: string) => void,
    onDone: (data: any) => void
) {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    // Per-call animator state (not shared between calls)
    let animationQueue: string[] = [];
    let isAnimating = false;
    let streamDone = false;
    let donePayload: any = null;

    function animateNext() {
        if (animationQueue.length === 0) {
            isAnimating = false;
            // If stream finished and queue is empty, fire onDone
            if (streamDone && donePayload) {
                onDone(donePayload);
                donePayload = null;
            }
            return;
        }
        const batch = animationQueue.splice(0, 20).join('');
        onChunk(batch);
        requestAnimationFrame(animateNext);
    }

    function enqueueChunk(text: string) {
        animationQueue.push(...text.split(''));
        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(animateNext);
        }
    }

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

            const jsonStr = trimmedLine.substring(6).trim();
            if (!jsonStr) continue;

            try {
                const parsed = JSON.parse(jsonStr);

                if (parsed.type === 'meta') {
                    onMeta(parsed);
                } else if (parsed.type === 'chunk') {
                    if (parsed.text) {
                        enqueueChunk(parsed.text);
                    }
                } else if (parsed.type === 'done') {
                    streamDone = true;
                    donePayload = parsed;
                    // If animation already finished, fire immediately
                    if (!isAnimating && animationQueue.length === 0) {
                        onDone(parsed);
                        donePayload = null;
                    }
                }
            } catch (e) {
                // skip malformed chunks
            }
        }
    }
}
