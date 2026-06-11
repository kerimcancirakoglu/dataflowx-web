const fs = require('fs');

let css = fs.readFileSync('src/app/intelroom/page.module.css', 'utf8');

// Replace global selectors
css = css.replace(/\*,\s*\*\:\:before,\s*\*\:\:after\s*\{[\s\S]*?\}/, '');
css = css.replace(/html\s*\{[\s\S]*?\}/, '');
css = css.replace(/body\s*\{([\s\S]*?)\}/, '.intelroomWrapper { $1 }');
css = css.replace(/::selection\s*\{[\s\S]*?\}/, '.intelroomWrapper ::selection { background: var(--accent); color: #fff; }');
css = css.replace(/^a\s*\{([\s\S]*?)\}/m, '.intelroomWrapper a { $1 }');
css = css.replace(/footer\s*\{([\s\S]*?)\}/, '.footer { $1 }'); // wait, the intelroom uses footer tag?
css = css.replace(/footer/g, '.footer'); // Just to be safe, any remaining footer selector

fs.writeFileSync('src/app/intelroom/page.module.css', css);
console.log('CSS fixed.');
