import re
import os

filepath = 'Css/style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add :root block at the top, after the @imports
root_block = """
:root {
    --neon-blue: #3b82f6;
    --neon-cyan: #06b6d4;
    --neon-cyan-light: #67e8f9;
    --neon-cyan-glow: rgba(6, 182, 212, 0.45);
    --neon-cyan-border: rgba(6, 182, 212, 0.25);
    
    /* Overriding old gold variables */
    --gold: var(--neon-cyan);
    --gold-primary: var(--neon-cyan);
    --gold-accent: var(--neon-blue);
    --gold-light: var(--neon-cyan-light);
    --gold2: var(--neon-cyan-light);
    --border: var(--neon-cyan-border);
    --gold-glow: 0 0 25px var(--neon-cyan-glow);
    --gold-glow-hover: 0 15px 40px rgba(6, 182, 212, 0.55);
}
"""

content = re.sub(r'(@import.*?;[\n\r]+)+', lambda m: m.group(0) + root_block, content, count=1)

# Replace hex colors
content = content.replace('#c9a84c', 'var(--neon-cyan)')
content = content.replace('#d4af37', 'var(--neon-cyan)')
content = content.replace('#f5d77f', 'var(--neon-cyan-light)')

# Replace rgba colors
content = re.sub(r'rgba\(\s*212\s*,\s*175\s*,\s*55\s*,\s*([0-9.]+)\s*\)', r'rgba(6, 182, 212, \1)', content)
content = re.sub(r'rgba\(\s*201\s*,\s*168\s*,\s*76\s*,\s*([0-9.]+)\s*\)', r'rgba(6, 182, 212, \1)', content)

# Update .main-header
content = re.sub(r'\.main-header\s*{[^}]*}', '.main-header {\n    text-align: center;\n    padding-top: 0;\n    overflow: visible;\n}', content)

# Update .hero--index
hero_index_new = """.hero--index {
    background: linear-gradient(rgba(10, 10, 12, 0.75), rgba(10, 10, 12, 0.85)), url('../imagenes/Gif_GOTY.gif') !important;
    background-size: cover !important;
    background-position: center !important;
    padding: 120px 20px !important;
    border-bottom: 2px solid var(--neon-cyan-border);
}"""
content = re.sub(r'\.hero--index\s*{[^}]*}', hero_index_new, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
