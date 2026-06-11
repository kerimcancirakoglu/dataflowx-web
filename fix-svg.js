const fs = require('fs');

let tsx = fs.readFileSync('src/app/dfx-intelroom/IntelRoomClient.tsx', 'utf8');

// Replace common SVG attributes
const attrs = [
  'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
  'stroke-dashoffset', 'fill-rule', 'clip-rule', 'vector-effect',
  'stop-color', 'stop-opacity'
];

attrs.forEach(attr => {
  const camelAttr = attr.replace(/-([a-z])/g, g => g[1].toUpperCase());
  const regex = new RegExp(attr + '=', 'g');
  tsx = tsx.replace(regex, camelAttr + '=');
});

// Remove any remaining `onclick="..."` which breaks React
tsx = tsx.replace(/onclick="[^"]*"/g, '');

fs.writeFileSync('src/app/dfx-intelroom/IntelRoomClient.tsx', tsx);
console.log('SVG attributes fixed.');
