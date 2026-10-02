import os
import re

css_dir = 'Css'

# Let's define the replacements for hex codes
hex_to_var = {
    '#c9a84c': 'var(--neon-cyan)',
    '#d4af37': 'var(--neon-cyan)',
    '#f5d77f': 'var(--neon-cyan-light)',
    '#f0d080': 'var(--neon-cyan-light)',
    '#c5a059': 'var(--neon-cyan)',
    '#7a5c1e': 'var(--neon-blue)'
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Hex replacements
    for hex_code, var_name in hex_to_var.items():
        # case insensitive replace for hex codes
        content = re.sub(hex_code, var_name, content, flags=re.IGNORECASE)

    # RGBA replacements: we will replace the RGB parts with var(--neon-cyan-rgb)
    # The gold RGBs are usually 212, 175, 55 or 201, 168, 76
    content = re.sub(r'rgba\(\s*212\s*,\s*175\s*,\s*55\s*,\s*([0-9.]+)\s*\)', r'rgba(var(--neon-cyan-rgb), \1)', content)
    content = re.sub(r'rgba\(\s*201\s*,\s*168\s*,\s*76\s*,\s*([0-9.]+)\s*\)', r'rgba(var(--neon-cyan-rgb), \1)', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir(css_dir):
    if filename.endswith('.css'):
        filepath = os.path.join(css_dir, filename)
        process_file(filepath)

# Now, ensure style.css has the :root block correctly
style_path = os.path.join(css_dir, 'style.css')
with open(style_path, 'r', encoding='utf-8') as f:
    style_content = f.read()

root_block = """
:root {
    --neon-blue: #3b82f6;
    --neon-cyan: #06b6d4;
    --neon-cyan-light: #67e8f9;
    --neon-cyan-rgb: 6, 182, 212;
    --neon-cyan-glow: rgba(var(--neon-cyan-rgb), 0.45);
    --neon-cyan-border: rgba(var(--neon-cyan-rgb), 0.25);
    
    /* Overriding old gold variables */
    --gold: var(--neon-cyan);
    --gold-primary: var(--neon-cyan);
    --gold-accent: var(--neon-blue);
    --gold-light: var(--neon-cyan-light);
    --gold2: var(--neon-cyan-light);
    --border: var(--neon-cyan-border);
    --gold-glow: 0 0 25px var(--neon-cyan-glow);
    --gold-glow-hover: 0 15px 40px rgba(var(--neon-cyan-rgb), 0.55);
}
"""

# if not already there, add it
if ':root' not in style_content:
    style_content = re.sub(r'(@import.*?;[\n\r]+)+', lambda m: m.group(0) + root_block, style_content, count=1)
    with open(style_path, 'w', encoding='utf-8') as f:
        f.write(style_content)

print("Done Refactoring All CSS Files")
