const fs = require('fs');
const path = require('path');

// Function to recursively find all .js files
function findJsFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!filePath.includes('node_modules')) {
                findJsFiles(filePath, fileList);
            }
        } else if (file.endsWith('.js')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Function to convert file from ES modules to CommonJS
function convertFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace export default
    if (content.includes('export default')) {
        content = content.replace(/^export default /gm, 'module.exports = ');
        modified = true;
    }

    // Replace named exports
    if (content.includes('export {')) {
        content = content.replace(/^export \{([^}]+)\};?/gm, 'module.exports = { $1 };');
        modified = true;
    }

    // Replace export const/let/var
    if (content.match(/^export (const|let|var) /gm)) {
        content = content.replace(/^export (const|let|var) (\w+)/gm, '$1 $2');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Converted: ${path.relative(process.cwd(), filePath)}`);
        return true;
    }

    return false;
}

// Main execution
const srcDir = path.join(__dirname, 'backend', 'src');
const jsFiles = findJsFiles(srcDir);

console.log(`Found ${jsFiles.length} JavaScript files\n`);

let convertedCount = 0;
jsFiles.forEach(file => {
    if (convertFile(file)) {
        convertedCount++;
    }
});

console.log(`\n✨ Converted ${convertedCount} files to CommonJS`);
