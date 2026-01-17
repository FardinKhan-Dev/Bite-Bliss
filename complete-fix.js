const fs = require('fs');
const path = require('path');

console.log('🚀 FINAL COMPREHENSIVE FIX FOR RENDER\n');

// Step 1: Rename .cjs back to .js
const configDir = path.join(__dirname, 'backend', 'config');
const cjsFiles = fs.readdirSync(configDir).filter(f => f.endsWith('.cjs'));

if (cjsFiles.length > 0) {
    console.log('📝 Step 1: Renaming .cjs files back to .js...');
    cjsFiles.forEach(file => {
        const oldPath = path.join(configDir, file);
        const newPath = path.join(configDir, file.replace('.cjs', '.js'));
        fs.renameSync(oldPath, newPath);
        console.log(`  ✅ ${file} → ${file.replace('.cjs', '.js')}`);
    });
} else {
    console.log('✓ Step 1: Config files already .js\n');
}

// Step 2: Remove "type": "module" from package.json
console.log('\n📝 Step 2: Removing "type": "module" from package.json...');
const packagePath = path.join(__dirname, 'backend', 'package.json');
let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
if (packageJson.type) {
    delete packageJson.type;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('  ✅ Removed "type": "module"');
} else {
    console.log('  ✓ Already removed');
}

// Step 3: Convert ALL src files to CommonJS
function convertToCommonJS(dir) {
    const files = fs.readdirSync(dir);
    let count = 0;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            count += convertToCommonJS(filePath);
        } else if (file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Replace export default
            if (content.match(/^export default /gm)) {
                content = content.replace(/^export default /gm, 'module.exports = ');
                modified = true;
            }

            // Replace import statements  
            if (content.match(/^import .+ from /gm)) {
                content = content.replace(/^import (.+) from ['"](.+)['"];?/gm, 'const $1 = require(\'$2\');');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                count++;
            }
        }
    });

    return count;
}

console.log('\n📝 Step 3: Converting all src files to CommonJS...');
const srcDir = path.join(__dirname, 'backend', 'src');
const converted = convertToCommonJS(srcDir);
console.log(`  ✅ Converted ${converted} files\n`);

console.log('✨ ALL DONE!\n');
console.log('Now commit and push:');
console.log('  git add .');
console.log('  git commit -m "fix: Complete CommonJS conversion for Render"');
console.log('  git push origin main');
