const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rootHeader = fs.readFileSync(path.resolve(__dirname, 'root_header.html'), 'utf8');
const rootFooter = fs.readFileSync(path.resolve(__dirname, 'root_footer.html'), 'utf8');

function injectHeaderAndFooter(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace or inject header
  if (html.includes('<header')) {
    html = html.replace(/<header[\s\S]*?<\/header>/i, rootHeader);
  } else {
    html = html.replace(/(<body[^>]*>[\s\S]*?id="skip-to-content"[^>]*>[\s\S]*?<\/a>)/i, '$1\n' + rootHeader);
  }

  // Replace or inject footer
  if (html.includes('<footer')) {
    html = html.replace(/<footer[\s\S]*?<\/footer>/i, rootFooter);
  } else if (html.includes('<div id="site-footer"></div>')) {
    html = html.replace('<div id="site-footer"></div>', rootFooter);
  } else if (html.includes('<div id="site-footer">')) {
    html = html.replace(/<div id="site-footer">[\s\S]*?<\/div>/i, rootFooter);
  } else {
    // Inject before floating buttons or scripts
    if (html.includes('<div class="floating-buttons">')) {
      html = html.replace('<div class="floating-buttons">', rootFooter + '\n<div class="floating-buttons">');
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully injected static header & footer into:', filePath);
}

injectHeaderAndFooter(path.join(root, 'contact/index.html'));
injectHeaderAndFooter(path.join(root, 'gallery/index.html'));

