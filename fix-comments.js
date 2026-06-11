const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

// Replace HTML comments with JSX comments
tsx = tsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Comments fixed.');
