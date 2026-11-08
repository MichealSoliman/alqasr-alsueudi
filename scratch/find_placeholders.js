const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts'];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (skip.includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getFiles(full, files);
    } else if (/\.(html|js|xml|json|md)$/i.test(item)) {
      files.push(full);
    }
  }
  return files;
}

const files = getFiles(root);
const matches = [];

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (line.includes('[[')) {
      const phs = line.match(/\[\[[a-zA-Z0-9_]+\]\]/g);
      if (phs) {
        phs.forEach(ph => {
          matches.push({ file: rel, line: idx + 1, placeholder: ph, text: line.trim() });
        });
      }
    }
  });
});

console.log(`Found ${matches.length} placeholder occurrences across project:`);
const summary = {};
matches.forEach(m => {
  summary[m.placeholder] = (summary[m.placeholder] || 0) + 1;
});
console.log('Summary by placeholder:', summary);

