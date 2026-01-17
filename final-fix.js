const fs = require('fs');
const path = require('path');

console.log('🔧 Final fix for Render deployment...\n');

// Step 1: Rename .cjs back to .js
const configDir = path.join(__dirname, 'backend', 'config');
const cjsFiles = fs.readdirSync(configDir).filter(f => f.endsWith('.cjs'));

console.log('📝 Renaming .cjs files back to .js...');
cjsFiles.forEach(file => {
    const oldPath = path.join(configDir, file);
    const newPath = path.join(configDir, file.replace('.cjs', '.js'));
    fs.renameSync(oldPath, newPath);
    console.log(`  ✅ ${file} → ${file.replace('.cjs', '.js')}`);
});

// Step 2: Remove "type": "module" from package.json
const packagePath = path.join(__dirname, 'backend', 'package.json');
let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
delete packageJson.type;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
console.log('\n✅ Removed "type": "module" from package.json\n');

console.log('✨ Done! Config files are back to .js and package.json fixed.');
console.log('\nCommit and push:');
console.log('  git add .');
console.log('  git commit -m "fix: Revert to .js config files for Strapi compatibility"');
console.log('  git push origin main');
