const assert = require('assert');
const fs = require('fs');
const path = require('path');

const FILETYPE_PRIORITY = {
  mdx: 3,
  md: 3,
  html: 2,
  jsx: 1,
  js: 1
};

const getExt = (filename) => path.extname(filename).replace(/^\./,'').toLowerCase();

module.exports = function (projectDir) {
  assert(projectDir, 'Expected project directory but got ' + projectDir);

  const relativeDest = path.join(__dirname, '..', '..', projectDir);

  const indexFiles = fs.readdirSync(relativeDest)
    .filter((filename) => /^index\./.test(filename))
    .sort((a, b) => (FILETYPE_PRIORITY[getExt(b)] || 0) - (FILETYPE_PRIORITY[getExt(a)] || 0));

  assert(indexFiles.length, 'Expected to find index.(mdx|md|html|js|jsx)');

  return {
    type: getExt(indexFiles[0]),
    name: path.resolve(path.join(relativeDest, indexFiles[0]))
  }
};