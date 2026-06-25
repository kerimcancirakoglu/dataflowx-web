import os

dirs_to_search = ['src', 'messages', 'chatbot-system-prompt.md']
target_string = 'DFX Sandbox'
replacement = 'DFX Malware Mitigation Sandbox'

for d in dirs_to_search:
    if os.path.isfile(d):
        with open(d, 'r') as f:
            content = f.read()
        if target_string in content:
            with open(d, 'w') as f:
                f.write(content.replace(target_string, replacement))
            print(f"Replaced in {d}")
        continue

    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.json', '.md', '.css')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                if target_string in content:
                    with open(filepath, 'w') as f:
                        f.write(content.replace(target_string, replacement))
                    print(f"Replaced in {filepath}")
