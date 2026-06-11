import os
import re

base = '/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web/src'

# 1. page.tsx
page_tsx = os.path.join(base, 'app/intelroom/page.tsx')
with open(page_tsx, 'r') as f:
    content = f.read()
content = re.sub(r"\s*overlay:\s*'[^']+',?", '', content)
content = content.replace("style={{ background: uc.overlay }}", "")
with open(page_tsx, 'w') as f:
    f.write(content)

# 2. page.module.css
page_css = os.path.join(base, 'app/intelroom/page.module.css')
with open(page_css, 'r') as f:
    content = f.read()
if '.cardOverlay {' in content:
    # add background if it's missing or update it
    content = re.sub(r'\.cardOverlay \{[^}]+\}', r'''.cardOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(10, 14, 26, 0.4) 0%, var(--color-bg) 95%);
}

:global([data-theme="light"]) .cardOverlay {
  background: linear-gradient(to bottom, rgba(248, 250, 252, 0.6) 0%, var(--color-bg) 95%);
}''', content)
with open(page_css, 'w') as f:
    f.write(content)

# 3. IntelLayerVisuals.tsx
layer_vis = os.path.join(base, 'components/IntelRoom/IntelLayerVisuals.tsx')
with open(layer_vis, 'r') as f:
    content = f.read()
content = content.replace('fill="#0A0E1A"', 'fill="var(--color-bg)"')
content = content.replace('fill="rgba(10, 14, 26, 0.8)"', 'fill="var(--color-bg)"')
with open(layer_vis, 'w') as f:
    f.write(content)

# 4. IntelComponents.module.css
comp_css = os.path.join(base, 'components/IntelRoom/IntelComponents.module.css')
with open(comp_css, 'r') as f:
    content = f.read()
content = re.sub(r'background:\s*rgba\(10,\s*14,\s*26,\s*0\.[7-9]\);', 'background: var(--color-bg);', content)
with open(comp_css, 'w') as f:
    f.write(content)

print("Fixes applied successfully.")
