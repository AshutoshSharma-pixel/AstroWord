import os
import logging
import google.generativeai as legacy_genai
from google import genai as new_genai

logger = logging.getLogger(__name__)

# Load keys from environment
KEY1 = os.environ.get("GEMINI_API_KEY")
KEY2 = os.environ.get("GEMINI_API_KEY_2")

def call_gemini_legacy(prompt, generation_config):
    """Fallback-aware synchronous wrapper for the legacy generativeai SDK."""
    try:
        legacy_genai.configure(api_key=KEY1)
        model = legacy_genai.GenerativeModel("gemini-2.5-flash")
        return model.generate_content(prompt, generation_config=generation_config)
    except Exception as e:
        error_msg = str(e)
        if ("429" in error_msg or "Resource exhausted" in error_msg) and KEY2:
            logger.warning("Primary Gemini key exhausted. Switching to fallback key (Legacy SDK).")
            legacy_genai.configure(api_key=KEY2)
            model = legacy_genai.GenerativeModel("gemini-2.5-flash")
            return model.generate_content(prompt, generation_config=generation_config)
        raise e

def call_gemini_new(prompt, config):
    """Fallback-aware synchronous wrapper for the new google-genai SDK."""
    try:
        client = new_genai.Client(api_key=KEY1, http_options={"api_version": "v1beta"})
        return client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=config
        )
    except Exception as e:
        error_msg = str(e)
        if ("429" in error_msg or "Resource exhausted" in error_msg) and KEY2:
            logger.warning("Primary Gemini key exhausted. Switching to fallback key (New SDK).")
            client = new_genai.Client(api_key=KEY2, http_options={"api_version": "v1beta"})
            return client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=config
            )
        raise e
