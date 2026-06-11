const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

// Fix unclosed input tags and 'readonly' attribute
tsx = tsx.replace(/<input([^>]*?)>/g, (match, p1) => {
    // If it doesn't end with / it's unclosed in JSX
    if (!p1.endsWith('/')) {
        return `<input${p1} />`;
    }
    return match;
});
// There was one without a `>` at all if it spanned multiple lines? 
// Let's replace 'readonly' with 'readOnly'
tsx = tsx.replace(/readonly/g, "readOnly");

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Inputs fixed.');
