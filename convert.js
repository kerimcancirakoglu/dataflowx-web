const fs = require('fs');

const html = fs.readFileSync('/Users/kerim/Desktop/DFX Zero Trust/info/Intelroom.html', 'utf8');

// 1. Extract CSS
let css = html.match(/<style>([\s\S]*?)<\/style>/i)[1];
// Remove mode switcher stuff if any
css = css.replace(/\[data-mode="clinical"\] \{[\s\S]*?\}/g, '');
// Replace variables if needed, or leave them.

// Convert kebab-case classes to camelCase in CSS
const classMap = {};
css = css.replace(/\.([a-z0-9-]+)/g, (match, p1) => {
    // some pseudo classes might match, but they have a colon before. 
    // Wait, regex \. matches literal dot.
    const camel = p1.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
    classMap[p1] = camel;
    return '.' + camel;
});

// Write CSS
fs.writeFileSync('src/app/dfx-intelroom/page.module.css', css);

// 2. Extract Body HTML
let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];

// Remove the mode switcher header
body = body.replace(/<header class="mode-bar">[\s\S]*?<\/header>/, '');
// Remove script tags
body = body.replace(/<script>[\s\S]*?<\/script>/, '');

// Convert HTML to JSX
// class to className
body = body.replace(/class="([^"]+)"/g, (match, p1) => {
    const classes = p1.split(' ').map(c => {
        const camel = c.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
        return `styles.${camel}`;
    }).join(', ');
    if (p1.split(' ').length > 1) {
        return `className={\`${p1.split(' ').map(c => `\${styles.${c.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())}}`).join(' ')}\`}`;
    }
    return `className={${classes}}`;
});

// style="" to style={{}}
body = body.replace(/style="([^"]+)"/g, (match, p1) => {
    const props = p1.split(';').filter(Boolean).map(p => {
        const [k, v] = p.split(':').map(s => s.trim());
        if (!k || !v) return '';
        // if k is custom prop like --score-pct
        if (k.startsWith('--')) {
            return `'${k}': '${v}'`;
        }
        const camelK = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${camelK}: '${v}'`;
    }).filter(Boolean).join(', ');
    return `style={{ ${props} } as React.CSSProperties}`;
});

// self-closing tags
body = body.replace(/<img([^>]+)>/g, '<img$1 />');
body = body.replace(/<br([^>]*)>/g, '<br$1 />');

const clientCode = `
'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function IntelRoomClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.intelroomWrapper}>
      ${body}
    </div>
  );
}
`;

fs.writeFileSync('src/app/dfx-intelroom/IntelRoomClient.tsx', clientCode);
console.log('Conversion done.');
