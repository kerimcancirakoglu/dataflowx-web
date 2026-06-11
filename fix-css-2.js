const fs = require('fs');

let css = fs.readFileSync('src/app/intelroom/page.module.css', 'utf8');

// Fix double dots
css = css.replace(/\.\.footer/g, '.footer');

// Fix any other 'a' or global tag selectors that aren't scoped
// Since we wrapped it in intelroomWrapper mostly, any standalone `a {` or `a:` should be scoped.
css = css.replace(/([^.\w\-])a\s*\{/g, '$1.intelroomWrapper a {');
css = css.replace(/([^.\w\-])a:hover\s*\{/g, '$1.intelroomWrapper a:hover {');
css = css.replace(/([^.\w\-])a:active\s*\{/g, '$1.intelroomWrapper a:active {');
css = css.replace(/([^.\w\-])a:focus\s*\{/g, '$1.intelroomWrapper a:focus {');
css = css.replace(/([^.\w\-])svg\s*\{/g, '$1.intelroomWrapper svg {');

// Remove remaining root level HTML selectors if any
css = css.replace(/^a\s*\{/m, '.intelroomWrapper a {');

fs.writeFileSync('src/app/intelroom/page.module.css', css);
console.log('CSS double dots fixed.');
