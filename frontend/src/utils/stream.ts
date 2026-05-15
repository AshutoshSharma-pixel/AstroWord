/**
 * Helper to handle streaming SSE responses from the backend.
 * Animates chunks character by character for smooth rendering.
 */

// Character-by-character animator
// Takes incoming chunks and drip-feeds them to the UI
// so even large batches feel smooth like ChatGPT
let animationQueue: string[] = [];
let isAnimating = false;

function resetAnimator() {
    animationQueue = [];
    isAnimating = false;
}

function enqueueChunk(text: string, onChunk: (char: string) => void) {
    animationQueue.push(...text.split(''));
    if (!isAnimating) {
        isAnimating = true;
        animateNext(onChunk);
    }
}

function animateNext(onChunk: (char: string) => void) {
    if (animationQueue.length === 0) {
        isAnimating = false;
        return;
    }
    // Drain up to 3 chars per frame for smooth but fast rendering
    const batch = animationQueue.splice(0, 3).join('');
    onChunk(batch);
    requestAnimationFrame(() => animateNext(onChunk));
}

export async function handleStreamResponse(
    response: Response,
    onMeta: (data: any) => void,
    onChunk: (text: string) => void,
    onDone: (data: any) => void
) {
    resetAnimator();
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

            const jsonStr = trimmedLine.substring(6);
            try {
                const parsed = JSON.parse(jsonStr);
                if (parsed.type === 'meta') {
                    onMeta(parsed.data || parsed);
                } else if (parsed.type === 'chunk') {
                    // Animate chunk character by character
                    enqueueChunk(parsed.text, onChunk);
                } else if (parsed.type === 'done') {
                    // Wait for animation to finish before calling done
                    const waitForAnimation = () => {
                        if (animationQueue.length === 0 && !isAnimating) {
                            onDone(parsed);
                        } else {
                            setTimeout(waitForAnimation, 50);
                        }
                    };
                    waitForAnimation();
                }
            } catch (e) {
                console.error('Error parsing SSE chunk:', e, jsonStr);
            }
        }
    }
}
