import os
import logging
from google import genai as new_genai

logger = logging.getLogger(__name__)

# Load all available Gemini keys from environment
GEMINI_KEYS = []
for i in range(1, 11): # Support up to 10 keys
    key_name = f"GEMINI_API_KEY_{i}" if i > 1 else "GEMINI_API_KEY"
    key = os.environ.get(key_name)
    if key:
        GEMINI_KEYS.append(key)


def call_gemini_new(prompt, config):
    """Fallback-aware synchronous wrapper for the new google-genai SDK."""
    last_error = None
    for i, key in enumerate(GEMINI_KEYS):
        try:
            client = new_genai.Client(api_key=key, http_options={"api_version": "v1beta"})
            return client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=config
            )
        except Exception as e:
            last_error = e
            error_msg = str(e)
            if ("429" in error_msg or "Resource exhausted" in error_msg) and i < len(GEMINI_KEYS) - 1:
                logger.warning(f"Gemini key {i+1} exhausted. Switching to key {i+2} (New SDK).")
                continue
            raise e
    raise last_error
