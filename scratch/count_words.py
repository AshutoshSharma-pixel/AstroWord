import re
import os

path = "frontend/src/app/blog/[slug]/page.tsx"
if not os.path.exists(path):
    print("Error: File not found")
    exit(1)

with open(path) as f:
    content = f.read()

# Let's find all the keys in the articles object.
# The keys are usually in the form `'slug': {` or `    'slug': {`
# We can find all keys and their corresponding titles and descriptions.

articles_regex = re.compile(r"(['\w-]+):\s*\{([^}]+)\}", re.DOTALL)
# A simple way is to use regex to find all article keys.
# Let's find matches for: keyName: { title: '...', description: '...', ... }
# Or we can just search for the specific slugs requested by the user.

slugs = [
    "dharma-karmadhipati-yoga",
    "kaal-sarp-dosha-explained",
    "moon-sign-meaning",
    "nakshatra-secrets",
    "navamsa-lagna-all-12-signs",
    "neecha-bhanga-raja-yoga",
    "panch-mahapurusha-yoga",
    "raja-yoga-in-astrology",
    "rising-sign-astrology",
    "sade-sati-guide",
    "vargottama-planets-meaning"
]

print("=== Blog Post Analysis ===")
for slug in slugs:
    # Find the article block
    pattern = rf"'{slug}':\s*\{{(.*?)\n\s*\n\s*\n|\n\s*'\w+':\s*\{{"
    # A safer way: find the start of the block and read until the next block starts or the end of the file.
    start_pos = content.find(f"'{slug}':")
    if start_pos == -1:
        start_pos = content.find(f'"{slug}":')
    
    if start_pos == -1:
        print(f"{slug}: NOT FOUND IN CODE")
        continue

    # Let's find where the next key starts or where the articles object ends
    # We can approximate by looking for the next key like `    'some-slug': {` or the end of the file.
    # Let's search from start_pos + 10 for the next pattern.
    next_match = re.search(r"\n\s+['\"][\w-]+['\"]:\s*\{", content[start_pos + 10:])
    end_pos = len(content)
    if next_match:
        end_pos = start_pos + 10 + next_match.start()
    
    block = content[start_pos:end_pos]
    
    # Extract title
    title_match = re.search(r"title:\s*['\"](.*?)['\"],", block)
    title = title_match.group(1) if title_match else "Unknown Title"
    
    # Estimate word count by stripping JSX tags and count words
    # Remove HTML/JSX tags
    clean_text = re.sub(r"<[^>]+>", " ", block)
    # Remove metadata lines like title:, description:, category:, date:, readTime:, keywords:, faqs:
    clean_text = re.sub(r"\b(title|description|category|date|readTime|keywords|faqs|relatedCalculator|content):\s*.*?\n", "", clean_text, flags=re.IGNORECASE)
    # Count words
    words = len(clean_text.split())
    
    print(f"{slug}: {words} words | Title: \"{title}\"")
