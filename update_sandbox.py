import re

with open('src/components/SandboxAnimation/SandboxAnimation.tsx', 'r') as f:
    content = f.read()

# Update SOURCES pos
content = re.sub(r"id: 'email',.*?pos: \{ x: \d+, y: \d+ \}", r"id: 'email',\n    label: 'Email Attachments',\n    sublabel: 'PHISHING / MALWARE',\n    color: '#ff6b35',\n    detailTitle: 'EMAIL THREAT MITIGATION',\n    detailText:\n      'Incoming emails are routed through DFX ESP to extract and detonate attached files (like PDFs or Office docs with hidden macros) in a safe virtual environment before delivering the sanitized email to the user.',\n    icon: (\n      <svg viewBox=\"0 0 64 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"4\" y=\"14\" width=\"56\" height=\"40\" rx=\"4\" fill=\"#1a0a00\" stroke=\"#ff6b35\" strokeWidth=\"2\" />\n        <path d=\"M4 20l28 20L60 20\" stroke=\"#ff6b35\" strokeWidth=\"2.5\" strokeLinecap=\"round\" />\n        <circle cx=\"48\" cy=\"16\" r=\"10\" fill=\"#ff4757\" />\n        <path d=\"M48 11v7M48 21v1\" stroke=\"white\" strokeWidth=\"2\" strokeLinecap=\"round\" />\n        <rect x=\"44\" y=\"14\" width=\"8\" height=\"2\" rx=\"1\" fill=\"white\" opacity=\"0.4\" />\n      </svg>\n    ),\n    pos: { x: -80, y: -80 }", content, flags=re.DOTALL)

content = re.sub(r"id: 'files',.*?pos: \{ x: \d+, y: \d+ \}", r"id: 'files',\n    label: 'Network Files',\n    sublabel: 'EXECUTABLE / SCRIPTS',\n    color: '#F5A706',\n    detailTitle: 'NETWORK TRAFFIC ANALYSIS',\n    detailText:\n      'Any executable or script attempting to traverse the network boundary is intercepted. It is executed within our custom VM profiles to track API calls, registry modifications, and evasive behaviors.',\n    icon: (\n      <svg viewBox=\"0 0 64 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"8\" y=\"8\" width=\"30\" height=\"38\" rx=\"3\" fill=\"#1a1200\" stroke=\"#F5A706\" strokeWidth=\"2\" />\n        <path d=\"M30 8l10 10H30V8z\" fill=\"#F5A706\" opacity=\"0.5\" />\n        <rect x=\"14\" y=\"24\" width=\"18\" height=\"2\" rx=\"1\" fill=\"#F5A706\" opacity=\"0.7\" />\n        <rect x=\"14\" y=\"30\" width=\"14\" height=\"2\" rx=\"1\" fill=\"#F5A706\" opacity=\"0.5\" />\n        <rect x=\"14\" y=\"36\" width=\"10\" height=\"2\" rx=\"1\" fill=\"#F5A706\" opacity=\"0.3\" />\n        <circle cx=\"46\" cy=\"44\" r=\"10\" fill=\"#1a1200\" stroke=\"#F5A706\" strokeWidth=\"2\" />\n        <path d=\"M42 44l3 3 5-6\" stroke=\"#F5A706\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" />\n      </svg>\n    ),\n    pos: { x: 540, y: -80 }", content, flags=re.DOTALL)

content = re.sub(r"id: 'usb',.*?pos: \{ x: \d+, y: \d+ \}", r"id: 'usb',\n    label: 'Hardware / USB',\n    sublabel: 'FIRMWARE / MEDIA',\n    color: '#00a3ff',\n    detailTitle: 'HARDWARE & MEDIA SCAN',\n    detailText:\n      'Physical media introduced to secure endpoints are scanned and virtually mounted in the sandbox. This prevents zero-day autorun exploits and firmware-level malware from touching the actual OS layer.',\n    icon: (\n      <svg viewBox=\"0 0 64 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"22\" y=\"4\" width=\"20\" height=\"36\" rx=\"4\" fill=\"#001122\" stroke=\"#00a3ff\" strokeWidth=\"2\" />\n        <rect x=\"30\" y=\"40\" width=\"4\" height=\"20\" fill=\"#00a3ff\" opacity=\"0.6\" />\n        <rect x=\"14\" y=\"52\" width=\"36\" height=\"6\" rx=\"3\" fill=\"#001122\" stroke=\"#00a3ff\" strokeWidth=\"1.5\" />\n        <rect x=\"28\" y=\"14\" width=\"8\" height=\"4\" rx=\"1\" fill=\"#00a3ff\" opacity=\"0.6\" />\n        <rect x=\"28\" y=\"22\" width=\"8\" height=\"4\" rx=\"1\" fill=\"#00a3ff\" opacity=\"0.4\" />\n        <circle cx=\"32\" cy=\"10\" r=\"3\" fill=\"#00a3ff\" />\n        <circle cx=\"49\" cy=\"15\" r=\"9\" fill=\"#ff4757\" />\n        <path\n          d=\"M49 10.5a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1.5h-4v-1.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z\"\n          fill=\"white\"\n          opacity=\"0.9\"\n        />\n        <rect x=\"47\" y=\"20\" width=\"1.5\" height=\"2\" rx=\"0.5\" fill=\"white\" opacity=\"0.9\" />\n        <rect x=\"50\" y=\"20\" width=\"1.5\" height=\"2\" rx=\"0.5\" fill=\"white\" opacity=\"0.9\" />\n      </svg>\n    ),\n    pos: { x: -80, y: 540 }", content, flags=re.DOTALL)

content = re.sub(r"id: 'web',.*?pos: \{ x: \d+, y: \d+ \}", r"id: 'web',\n    label: 'Web Documents',\n    sublabel: 'PDF / OFFICE / LINKS',\n    color: '#22d3ee',\n    detailTitle: 'WEB & LINK ISOLATION',\n    detailText:\n      'Files downloaded from web gateways and malicious URLs are opened inside the Sandbox. Dynamic web isolation detects drive-by downloads and prevents them from executing on user endpoints.',\n    icon: (\n      <svg viewBox=\"0 0 64 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <circle cx=\"32\" cy=\"32\" r=\"24\" fill=\"#001a1a\" stroke=\"#22d3ee\" strokeWidth=\"2\" />\n        <path d=\"M32 8C24 20 24 44 32 56M32 8C40 20 40 44 32 56\" stroke=\"#22d3ee\" strokeWidth=\"1.5\" strokeDasharray=\"3 2\" />\n        <path d=\"M8 32h48\" stroke=\"#22d3ee\" strokeWidth=\"1.5\" strokeDasharray=\"3 2\" />\n        <path d=\"M12 20h40M12 44h40\" stroke=\"#22d3ee\" strokeWidth=\"1\" opacity=\"0.4\" />\n        <circle cx=\"48\" cy=\"16\" r=\"9\" fill=\"#ff4757\" />\n        <path d=\"M48 12l.8 5.6h-1.6L48 12zM48 19.5v1\" stroke=\"white\" strokeWidth=\"1.8\" strokeLinecap=\"round\" />\n      </svg>\n    ),\n    pos: { x: 540, y: 540 }", content, flags=re.DOTALL)

# Update FEATURE_LABELS
new_features = """const FEATURE_LABELS = [
  { label: 'BEHAVIORAL ANALYSIS',  sceneX: -50, sceneY: 280, z: 80 },
  { label: 'ISOLATED EXECUTION',   sceneX: 200, sceneY: -20, z: 80 },
  { label: 'PATTERN DETECTION',    sceneX: 200, sceneY: 530, z: 80 },
  { label: 'THREAT INTELLIGENCE',  sceneX: 500, sceneY: 280, z: 80 },
];"""
content = re.sub(r"const FEATURE_LABELS = \[.*?\];", new_features, content, flags=re.DOTALL)

# Update STATUS_BADGES
new_badges = """const STATUS_BADGES = [
  { label: 'THREAT DETECTED', color: '#ff4757', sceneX: -40,  sceneY: -120, z: 60 },
  { label: 'ANALYZING...',    color: '#F5A706', sceneX: 560, sceneY: -120, z: 60 },
  { label: 'QUARANTINED',     color: '#22d3ee', sceneX: -40,  sceneY: 690, z: 60 },
  { label: 'SAFE — PASSED',   color: '#2ed573', sceneX: 560, sceneY: 690, z: 60 },
];"""
content = re.sub(r"const STATUS_BADGES = \[.*?\];", new_badges, content, flags=re.DOTALL)

with open('src/components/SandboxAnimation/SandboxAnimation.tsx', 'w') as f:
    f.write(content)

