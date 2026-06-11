import json

with open('/Users/kerim/.gemini/antigravity-ide/brain/dbac955a-7b69-41e1-b007-e5223108362e/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] == 'write_to_file' and 'PortXAnimation' in call['args'].get('TargetFile', ''):
                        step = data.get('step_index')
                        print(f"FOUND IN STEP {step}: {call['args'].get('TargetFile')}")
                        if step < 1200 and 'CodeContent' in call['args']:
                            out_path = call['args']['TargetFile'].split('/')[-1] + '.bak'
                            # remove leading/trailing quotes if they exist from json serialization
                            content = call['args']['CodeContent']
                            if content.startswith('"') and content.endswith('"'):
                                content = content[1:-1]
                            # unescape newlines
                            content = content.replace('\\n', '\n')
                            with open(out_path, 'w') as out:
                                out.write(content)
                            print(f"Saved to {out_path}")
        except Exception as e:
            pass
