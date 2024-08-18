const assert = require('assert');
const fs = require('fs');
const path = require('path');

const FILETYPE_PRIORITY = {
  jsx: 5,
  js: 4,
  mdx: 3,
  md: 2,
  html: 1,
};

const getExt = (filename) => path.extname(filename).replace(/^\./,'').toLowerCase();

module.exports = function (absProjectDir) {
  assert(absProjectDir, 'Get Entry File: Expected project directory as argument but got ' + absProjectDir);
  assert(path.isAbsolute(absProjectDir), "Get Entry File: Path is not absolute. Path was " + absProjectDir);
  assert(fs.existsSync(absProjectDir), "Get Entry File: Path does not exist. Attempted to find " + absProjectDir);

  // FILES OF INTEREST MUST CONTAIN A FILE PREFIXED WITH "index"
  const indexFiles = fs.readdirSync(absProjectDir)
    .filter((filename) => /^index\./.test(filename))
    .sort((a, b) => (FILETYPE_PRIORITY[getExt(b)] || 0) - (FILETYPE_PRIORITY[getExt(a)] || 0));

  assert(indexFiles.length, 'Expected to find index.(mdx|md|html|js|jsx)');

  return {
    type: getExt(indexFiles[0]),
    name: path.resolve(path.join(absProjectDir, indexFiles[0]))
  }
};