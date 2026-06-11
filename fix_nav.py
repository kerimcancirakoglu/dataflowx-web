import os
import re

filepath = '/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web/src/components/Nav/Nav.module.css'
with open(filepath, 'r') as file:
    content = file.read()

content = re.sub(r'background:\s*rgba\((?:0,\s*0,\s*0|5,\s*5,\s*5|8,\s*8,\s*8),\s*0\.[4-9]\d?\);', r'background: var(--color-bg);', content)

with open(filepath, 'w') as file:
    file.write(content)
print("Done")
