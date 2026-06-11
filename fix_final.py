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
                            if out_path.endswith('"'):
                                out_path = out_path[:-1]
                            
                            content = json.loads(call['args']['CodeContent'])
                            
                            with open(f"src/components/PortXAnimation/{out_path}", 'w') as out:
                                out.write(content)
                            print(f"Successfully recovered {out_path}")
        except Exception as e:
            pass
