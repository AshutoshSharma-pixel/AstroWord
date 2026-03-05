export async function safeApiFetch(url: string, options: RequestInit = {}, fallbackData: any = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`[safeApiFetch] API returned ${response.status} for ${url}. Using fallback.`);
            return fallbackData;
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`[safeApiFetch] Network/timeout error for ${url}. Using fallback.`, error);
        return fallbackData;
    }
}
