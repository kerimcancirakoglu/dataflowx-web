import os
import re

files = [
    'src/app/intelroom/page.module.css',
    'src/components/IntelRoom/IntelComponents.module.css',
    'src/components/IntelRoom/IntelHeroMap.module.css'
]

for f in files:
    filepath = os.path.join('/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web', f)
    with open(filepath, 'r') as file:
        content = file.read()

    # Backgrounds
    content = re.sub(r'background(-color)?:\s*#(0A0E1A|0D111A|0f1422|0a0d16|0D1326|0A0F19);', r'background: var(--color-bg);', content, flags=re.IGNORECASE)
    content = re.sub(r'background(-color)?:\s*rgba\((255, 255, 255|10, 15, 25|0, 0, 0),\s*0\.0[1-6]\);', r'background: var(--color-ui);', content)
    content = re.sub(r'background(-color)?:\s*rgba\((255, 255, 255|10, 15, 25|0, 0, 0),\s*0\.[1-9]\d?\);', r'background: var(--color-ui);', content)
    
    # Text colors
    content = re.sub(r'color:\s*#(E2E8F0|ffffff|fff);', r'color: var(--color-text);', content, flags=re.IGNORECASE)
    content = re.sub(r'color:\s*#(94A3B8|cbd5e1);', r'color: var(--color-text-muted);', content, flags=re.IGNORECASE)
    content = re.sub(r'color:\s*rgba\(255, 255, 255, 0\.[5-9]\d?\);', r'color: var(--color-text-muted);', content)
    
    # Borders
    content = re.sub(r'border(?:-[a-z]+)?:\s*1px solid rgba\(255, 255, 255, 0\.0[1-9]\);', r'border: 1px solid var(--color-border);', content)
    content = re.sub(r'border(?:-[a-z]+)?:\s*1px solid rgba\(255, 255, 255, 0\.[1-9]\d?\);', r'border: 1px solid var(--color-border);', content)
    content = re.sub(r'border-color:\s*rgba\(255, 255, 255, 0\.[0-9]\d?\);', r'border-color: var(--color-border);', content)
    
    # Gradients with hardcoded dark
    content = content.replace('rgba(10, 15, 25, 0.6)', 'var(--color-bg)')
    content = content.replace('rgba(10, 15, 25, 0.9)', 'var(--color-bg)')

    with open(filepath, 'w') as file:
        file.write(content)

print("Done")
