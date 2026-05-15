/**
 * Helper to handle streaming SSE responses from the backend.
 * Parses chunks of the format "data: {...}\n\n"
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

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

            const jsonStr = trimmedLine.substring(6);
            try {
                const parsed = JSON.parse(jsonStr);
                if (parsed.type === 'meta') {
                    // For meta, we often send data in a 'data' field, but sometimes it's the whole object
                    onMeta(parsed.data || parsed);
                } else if (parsed.type === 'chunk') {
                    onChunk(parsed.text);
                } else if (parsed.type === 'done') {
                    onDone(parsed);
                }
            } catch (e) {
                console.error('Error parsing SSE chunk:', e, jsonStr);
            }
        }
    }
}
