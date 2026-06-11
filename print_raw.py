import json

with open('/Users/kerim/.gemini/antigravity-ide/brain/dbac955a-7b69-41e1-b007-e5223108362e/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] == 'write_to_file' and 'PortXAnimation.tsx' in call['args'].get('TargetFile', ''):
                        step = data.get('step_index')
                        if step < 1200 and 'CodeContent' in call['args']:
                            print(repr(call['args']['CodeContent'][:100]))
        except Exception as e:
            pass
