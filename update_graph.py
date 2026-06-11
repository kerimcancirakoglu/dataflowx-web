import os
import re

base = '/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web/src/components/IntelRoom'

# 1. Update IntelComponents.module.css
css_file = os.path.join(base, 'IntelComponents.module.css')
with open(css_file, 'r') as f:
    css = f.read()

# Fix hardcoded colors in node lines and circles
css = css.replace('stroke: rgba(255, 255, 255, 0.05);', 'stroke: var(--color-border);')
css = css.replace('fill: #1E293B;', 'fill: var(--color-merge);')
css = css.replace('stroke: rgba(255, 255, 255, 0.1);', 'stroke: var(--color-border);')
css = css.replace('fill: #fff;', 'fill: var(--color-text);')

if '.nodePopover' not in css:
    css += '''
/* Node Popover */
.nodePopover {
  position: absolute;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  width: 220px;
  pointer-events: none;
  transform: translate(-50%, -120%);
  z-index: 50;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  visibility: hidden;
}

.nodePopover.visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -100%);
}

.popoverHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.popoverTitle {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.riskScore {
  font-weight: 700;
  font-size: 0.85rem;
}

.riskScore.high {
  color: var(--color-rx);
}

.riskScore.medium {
  color: #F5A706;
}

.riskScore.low {
  color: var(--color-tx);
}

.popoverBody {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.popoverRow {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

.popoverLabel {
  color: var(--color-text-muted);
}

.popoverValue {
  color: var(--color-text);
  font-weight: 500;
}

.nodePulse {
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(2.5); opacity: 0; }
}
'''

with open(css_file, 'w') as f:
    f.write(css)

print("CSS updated.")
