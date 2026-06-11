import ast

with open('src/components/PortXAnimation/PortXAnimation.tsx', 'r') as f:
    content = f.read()

try:
    # Evaluates the string representation of a python string into an actual python string
    content = ast.literal_eval(content)
    with open('src/components/PortXAnimation/PortXAnimation.tsx', 'w') as f:
        f.write(content)
except:
    pass

with open('src/components/PortXAnimation/PortXAnimation.module.css', 'r') as f:
    content = f.read()

try:
    content = ast.literal_eval(content)
    with open('src/components/PortXAnimation/PortXAnimation.module.css', 'w') as f:
        f.write(content)
except:
    pass
