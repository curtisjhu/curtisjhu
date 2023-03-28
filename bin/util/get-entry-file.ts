const assert = require('assert');
const fs = require('fs');
const path = require('path');

const FILETYPE_PRIORITY = {
  mdx: 4,
  md: 3,
  html: 2,
  js: 1
};

const getExt = (filename: string) : string => path.extname(filename).replace(/^\./,'').toLowerCase();

export default function (projectDir: string) {
  assert(projectDir, 'Expected project directory but got ' + projectDir);

  const indexFiles = fs.readdirSync(path.join(__dirname, '..', '..', projectDir))
    .filter((filename: string) => /^index\./.test(filename))
    .sort((a: string, b: string) => ((FILETYPE_PRIORITY as any)[getExt(b)] || 0) - ((FILETYPE_PRIORITY as any)[getExt(a)] || 0));

  assert(indexFiles.length, 'Expected to find index.(mdx|md|html|js)');

  return {
    type: getExt(indexFiles[0]),
    name: indexFiles[0]
  }
};