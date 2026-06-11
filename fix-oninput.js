const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

tsx = tsx.replace(/oninput="[^"]*"/g, '');

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Removed oninput.');
