const fs = require('fs');
const path = require('path');

const GSAP_FILES = [
  'src/components/DataFlowDiagram/EmailSecurityDiagram.tsx',
  'src/components/DataFlowDiagram/DataFlowDiagram.tsx',
  'src/components/DataFlowDiagram/SandboxDiagram.tsx',
  'src/components/DataFlowDiagram/TrueCDRDiagram.tsx',
  'src/components/DataFlowDiagram/SecureRemoteAccessDiagram.tsx',
  'src/components/DataFlowDiagram/IntelRoomDiagram.tsx',
  'src/components/PartnersMap/PartnersMap.tsx',
  'src/components/UnidirectionalGatewayDiagram/UnidirectionalGatewayDiagram.tsx',
  'src/components/EmailSecurityAnimation/EmailSecurityAnimation.tsx',
  'src/components/SandboxAnimation/SandboxAnimation.tsx',
  'src/components/CDRAnimation/CDRAnimation.tsx',
  'src/components/EmailSecurityLayers/EmailSecurityLayers.tsx',
  'src/components/SandboxFamily/SandboxFamily.tsx',
  'src/components/BrokerFamily/BrokerFamily.tsx',
  'src/components/GatewayFamily/GatewayFamily.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // 1. Remove static import
  content = content.replace(/import\s+{\s*gsap\s*}\s+from\s+['"]gsap['"];?\n?/g, '');
  content = content.replace(/import\s+gsap\s+from\s+['"]gsap['"];?\n?/g, '');

  // 2. Fix useEffect
  // Find: const ctx = gsap.context(() => {
  // Replace:
  // let ctx: any;
  // import('gsap').then(({ gsap }) => {
  //   ctx = gsap.context(() => {
  const ctxRegex = /const\s+ctx\s*=\s*gsap\.context\(\(\)\s*=>\s*\{/g;
  
  if (ctxRegex.test(content)) {
    content = content.replace(
      ctxRegex,
      `let ctx: any;
    import('gsap').then(({ gsap }) => {
      ctx = gsap.context(() => {`
    );
    
    // We also need to close the import promise block after }, containerRef);
    // Find: }, containerRef);
    // Replace: }, containerRef);\n    });
    // Find: }, ref);
    // Replace: }, ref);\n    });
    const endRegex = /\},\s*([a-zA-Z0-9_]+Ref)\);/g;
    content = content.replace(endRegex, `}, $1);\n    });`);
    
    // For PartnersMap it might not have containerRef:
    // It might be }, mapRef);
  } else {
    // If it doesn't use ctx = gsap.context, let's see how it uses gsap
    // For example PartnersMap
    const initRegex = /const\s+initMap\s*=\s*\(\)\s*=>\s*\{/g;
    if (content.includes('gsap.')) {
      // It uses gsap directly without context.
      console.log(`Manual intervention might be needed for ${filePath}`);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`No changes made to: ${filePath}`);
  }
}

GSAP_FILES.forEach(processFile);
