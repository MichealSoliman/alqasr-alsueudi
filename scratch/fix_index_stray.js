const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(p, 'utf8');

// Find the stray portion starting at '</body></html'
const strayIdx = html.indexOf('</body></html');
if (strayIdx !== -1) {
  const strayContent = html.substring(strayIdx);
  console.log('Stray content found, length:', strayContent.length);

  // Extract Q9, Q10, Q11 from the stray content
  const q9Start = strayContent.indexOf('<!-- Q9 -->');
  let faqAdditions = '';
  if (q9Start !== -1) {
    faqAdditions = strayContent.substring(q9Start).replace(/<\/div>\s*>\s*$/, '').trim();
  }

  // Remove the stray content from after </body>
  html = html.substring(0, strayIdx);

  // Insert Q9, Q10, Q11 inside the FAQ section after faq-ans-8 if they aren't already there
  if (!html.includes('faq-ans-9') && faqAdditions) {
    const q8End = html.indexOf('</div>\n\n            </div>\n\n        </div>\n    </section>');
    if (q8End !== -1) {
      html = html.substring(0, q8End) + '</div>\n\n' + faqAdditions + '\n\n' + html.substring(q8End);
    }
  }

  // Ensure clean closing tags
  html = html.trim() + '\n</body>\n</html>\n';
  fs.writeFileSync(p, html, 'utf8');
  console.log('Cleaned up index.html successfully!');
} else {
  console.log('No stray </body></html found');
}

