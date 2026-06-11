const fs = require('fs');
const parser = require('@babel/parser');

const code = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

try {
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  console.log('Parsed successfully');
} catch (e) {
  console.error(e);
}
