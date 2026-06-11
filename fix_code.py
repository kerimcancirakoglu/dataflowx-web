import json

with open('/Users/kerim/.gemini/antigravity-ide/brain/dbac955a-7b69-41e1-b007-e5223108362e/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] == 'write_to_file' and 'PortXAnimation' in call['args'].get('TargetFile', ''):
                        step = data.get('step_index')
                        if step < 1200 and 'CodeContent' in call['args']:
                            out_path = call['args']['TargetFile'].split('/')[-1]
                            content = call['args']['CodeContent']
                            
                            # Next JS uses 'use client'; so let's just write the content out directly.
                            # But wait! If the AI wrote `write_to_file` and passed a string, we might just need to write it.
                            
                            # Remove outer quotes if they exist (sometimes the AI outputs strings wrapped in double quotes)
                            if content.startswith('"') and content.endswith('"'):
                                content = content[1:-1]
                                # Also replace escaped newlines because they were inside a string literal
                                content = content.replace('\\n', '\n')
                                content = content.replace('\\"', '"')
                            with open(f"src/components/PortXAnimation/{out_path}", 'w') as out:
                                out.write(content)
                            print(f"Fixed {out_path}")
        except Exception as e:
            pass
