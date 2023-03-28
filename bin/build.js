#!/usr/bin/env node

const getEntryFile = require('./util/get-entry-file');
const simpleHtmlIndex = require('simple-html-index');
const htmlInjectMeta = require('html-inject-meta');
const minifyStream = require('minify-stream');
const hyperstream = require('hyperstream');
const browserify = require('browserify');
const glslify = require('glslify');
const mkdirp = require('mkdirp');
const assert = require('assert');
const babelify = require('babelify');
const path = require('path');
const cpr = require('cpr');
const fs = require('fs');
import {compile} from '@mdx-js/mdx'

var projectDir = process.argv[2];
if (!/^src\//.test(projectDir)) projectDir = path.join('pages', projectDir);
const entryFile = getEntryFile(projectDir);
const outputDir = projectDir.replace(/^pages\//, '../');

console.log('Building ', projectDir);

switch (entryFile.type) {
  case 'mdx':
  case 'md':
    const compiled = await compile(await fs.readFile(entryFile))
    
    break;
  case 'html':
    break;
  case 'js':
    var metadata = {};
    try {
      const metadataPath = require.resolve(path.join(__dirname, '..', projectDir, 'metadata.json'));
      metadata = require(metadataPath);
    } catch (e) { }

    mkdirp.sync(path.join(__dirname, '..', outputDir));

    const cssInputPath = path.join(__dirname, '..', projectDir, 'index.css');
    const cssExists = fs.existsSync(cssInputPath);
    if (cssExists) {
      const cssOutputPath = path.join(__dirname, '..', outputDir, 'index.css');
      fs.createReadStream(cssInputPath).pipe(fs.createWriteStream(cssOutputPath));
    }

    const htmlOutputPath = path.join(__dirname, '..', outputDir, 'index.html');
    const bundleOutputPath = path.join(__dirname, '..', outputDir, 'bundle.js');

    var b = browserify(path.join(__dirname, '..', projectDir, entryFile.name), {
      transform: [
        glslify,
        [babelify, {presets: ["@babel/preset-env"]}]
      ],
      debug: false
    });

    b.bundle()
      .pipe(minifyStream({sourceMap: false}))
      .pipe(fs.createWriteStream(bundleOutputPath));

    var metaForInject = {
      name: metadata.title,
      description: metadata.description,
      author: metadata.author ||  "Curtis Hu",
    };

    if (metadata.image) {
      metaForInject.image = metadata.image;
    }

    console.log('metaForInject:', metaForInject);

    simpleHtmlIndex({
        entry: 'bundle.js',
        title: metadata.title,
        css: cssExists ? 'index.css' : null
      })
      .pipe(htmlInjectMeta(metaForInject))
      .pipe(hyperstream({
        body: {_appendHtml: '<script src="../nav.bundle.js"></script>'},
        head: {_appendHtml:
          '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />'
        }
      }))
      .pipe(fs.createWriteStream(htmlOutputPath));

    ['static', 'fonts'].forEach(dir => {
      var cpInputDir = path.join(__dirname, '..', projectDir, dir);
      var cpOutputDir = path.join(__dirname, '..', outputDir, dir);

      if (fs.existsSync(cpInputDir)) {
        console.log('copying', dir);
        cpr(cpInputDir, cpOutputDir, {});
      }
    });

    break;
  default:
    assert(entryFile.type, 'Unknown filetype for file "' + entryFile.name + '"');
}