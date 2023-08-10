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
const esbuild = require("esbuild");
const fse = require("fs-extra");

var projectDir = process.argv[2];

if (!projectDir)
  throw new Error("NEEDS PROJECT FOLDER")

if (!/^src\//.test(projectDir)) projectDir = path.join('pages', projectDir);
const entryFile = getEntryFile(projectDir);
const outputFile = entryFile.name.replace("pages", 'dist');

const outputDir = projectDir.replace("pages", "dist");

console.log('Building ', projectDir);

switch (entryFile.type) {
  case 'html':
    break;
  case 'jsx':
    console.log("Building for jsx");

    fse.copy(projectDir, outputDir, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
      }
    });

    if (fs.existsSync(outputFile)) {
      fs.rmSync(outputFile);
    }

    esbuild
        .buildSync({
            entryPoints: [path.join(projectDir, "index.jsx")],
            bundle: true,
            minify: true,
            treeShaking: true,
            outfile: path.join(outputDir, "bundle.js"),
        })
    break;
  case 'js':
    console.log("Building for js");

    var metadata = {};
    try {
      const metadataPath = require.resolve(path.join(__dirname, '..', projectDir, 'metadata.json'));
      metadata = require(metadataPath);
    } catch (e) { }

    fse.copy(projectDir, outputDir, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("copied over!");
      }
    });


    const htmlOutputPath = path.join(__dirname, '..', outputDir, 'index.html');
    const bundleOutputPath = path.join(__dirname, '..', outputDir, 'bundle.js');

    console.log(entryFile.name)
    var b = browserify(entryFile.name, {
      transform: [
        glslify,
        babelify
      ],
      debug: false
    });

    b.bundle()
      .pipe(minifyStream({sourceMap: false}))
      .pipe(fs.createWriteStream(bundleOutputPath));

    console.log("bundle.js generated")
    
    if (fs.existsSync(path.join(outputDir, "index.js")))
      fs.rmSync(path.join(outputDir, "index.js"));
    

    // creating html
    console.log("creating html")
    var metaForInject = {
      name: metadata.title,
      description: metadata.description,
      author: metadata.author ||  "Curtis Hu",
    };

    if (metadata.image) {
      metaForInject.image = metadata.image;
    }


    simpleHtmlIndex({
        entry: 'bundle.js',
        title: metadata.title,
        css: 'index.css'
      })
      .pipe(htmlInjectMeta(metaForInject))
      .pipe(hyperstream({
        body: {_appendHtml: '<script src="../nav.bundle.js"></script>'},
        head: {_appendHtml:
          '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />'
        }
      }))
      .pipe(fs.createWriteStream(htmlOutputPath));

    console.log("created html")

    break;
  default:
    assert(entryFile.type, 'Unknown filetype for file "' + entryFile.name + '"');
}