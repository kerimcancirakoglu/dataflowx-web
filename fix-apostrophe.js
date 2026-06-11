const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

// Replace specific known bad strings with unescaped apostrophes
tsx = tsx.replace(/feed'de/g, "feed&apos;de");
tsx = tsx.replace(/MSSP'lerin/g, "MSSP&apos;lerin");
tsx = tsx.replace(/IOC'ler/g, "IOC&apos;ler");
tsx = tsx.replace(/IOC'leri/g, "IOC&apos;leri");
tsx = tsx.replace(/Sistem'in/g, "Sistem&apos;in");

// Find other unescaped ' not in quotes or attributes? It's safer to just fix the known ones.
// I'll also do a global replace of apostrophes that are clearly in Turkish text:
tsx = tsx.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1&apos;$2");

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Apostrophes fixed.');
