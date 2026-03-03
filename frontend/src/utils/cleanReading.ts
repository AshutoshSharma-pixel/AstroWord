/**
 * Sanitises a reading string returned from the backend before rendering it
 * as markdown. Handles the cases where Gemini returns raw JSON or prepends
 * boilerplate preamble text.
 */
export function cleanReading(reading: string): string {
    if (!reading) return '';

    // Strip raw JSON wrapper (e.g. when Gemini returns {"reading":"..."})
    const trimmed = reading.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('```json')) {
        try {
            const withoutFences = trimmed
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const parsed = JSON.parse(withoutFences);
            return parsed.reading || parsed.answer || withoutFences;
        } catch {
            return reading;
        }
    }

    // Strip common AI preamble phrases that precede the actual content
    const preambles = [
        /^Here (is|are) .+?:\n+/i,
        /^Sure[,!].+?\n+/i,
        /^Based on .+?:\n+/i,
        /^The following.+?:\n+/i,
        /^Below (is|are).+?:\n+/i,
    ];

    let cleaned = reading;
    for (const pattern of preambles) {
        cleaned = cleaned.replace(pattern, '');
    }

    return cleaned.trim();
}
