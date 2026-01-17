const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Render deployment issues...\n');

// Step 1: Rename config files to .cjs
const configDir = path.join(__dirname, 'backend', 'config');
const configFiles = fs.readdirSync(configDir).filter(f => f.endsWith('.js'));

console.log('📝 Renaming config files to .cjs...');
configFiles.forEach(file => {
    const oldPath = path.join(configDir, file);
    const newPath = path.join(configDir, file.replace('.js', '.cjs'));
    fs.renameSync(oldPath, newPath);
    console.log(`  ✅ ${file} → ${file.replace('.js', '.cjs')}`);
});

// Step 2: Revert all src files back to ES modules
function revertToESModules(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            revertToESModules(filePath);
        } else if (file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Revert module.exports back to export default
            if (content.includes('module.exports')) {
                content = content.replace(/^module\.exports = /gm, 'export default ');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  ✅ ${path.relative(process.cwd(), filePath)}`);
            }
        }
    });
}

console.log('\n📝 Reverting src files to ES modules...');
const srcDir = path.join(__dirname, 'backend', 'src');
revertToESModules(srcDir);

console.log('\n✨ All done! Now commit and push:\n');
console.log('  git add .');
console.log('  git commit -m "fix: Use .cjs for config files, ES modules for src"');
console.log('  git push origin main');
