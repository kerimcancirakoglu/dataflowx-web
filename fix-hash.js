const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

// Escape {hash}
tsx = tsx.replace(/{hash}/g, '{"{"}hash{"}"}');

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Hash escaped.');
