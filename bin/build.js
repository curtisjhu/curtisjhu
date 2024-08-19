#!/usr/bin/env node

const getEntryFile = require('./util/get-entry-file');
const browserify = require('browserify');
const glslify = require('glslify');
const mkdirp = require('mkdirp');
const assert = require('assert');
const babelify = require('babelify');
const path = require('path');
const fs = require('fs');
const esbuild = require("esbuild");
const fse = require("fs-extra");
const { injectHTML } = require("node-inject-html");
const htmlWithMetadata = require("./injectHTML");
const esmify = require("esmify");

var projectDir = process.argv[2];

if (!projectDir)
  throw new Error("NEEDS PROJECT FOLDER")

if (!/^pages\//.test(projectDir))
  projectDir = path.join('pages', projectDir);
projectDir = path.join(__dirname, "..", projectDir);

const outputDir = projectDir.replace("pages", "dist");
console.log('FROM PROJECT FOLDER: ', projectDir);
console.log('TO PROJECT FOLDER: ', outputDir);

const entryFile = getEntryFile(projectDir);
console.log("COMPILING FROM FILE: ", entryFile);

const outputFile = entryFile.name.replace("pages", 'dist').replace("index", "bundle");
console.log("COMPILING TO FILE: ", outputFile);


/////////////////////////////////////////////
// generate HTML files 
/////////////////////////////////////////////
switch (entryFile.type) {
  case 'html':
    /////////////////////////////////////////////
    // Copying Over HTML files 
    /////////////////////////////////////////////
    console.log("Building for HTML");

    if (!fs.existsSync(outputDir))
      mkdirp.mkdirpSync(outputDir);

    fse.copySync(projectDir, outputDir);
    console.log("Successfully copied over directory!");

  case 'jsx':
  case 'js':
    /////////////////////////////////////////////
    // Copying Over Template HTML files 
    /////////////////////////////////////////////
    if (!fs.existsSync(outputDir))
      mkdirp.mkdirpSync(outputDir);

    var htmlOutputPath = path.join(outputDir, 'index.html');
    if (!fs.existsSync(htmlOutputPath))
      fse.copySync(path.join(__dirname, "..", "templates", "_index.html"), htmlOutputPath);
    console.log("html created")

  case 'html':
  case 'js':
  case 'jsx':
    /////////////////////////////////////////////
    // Injecting Metadata 
    /////////////////////////////////////////////

    var htmlOutputPath = path.join(outputDir, 'index.html');
    var outputHtmlString = fse.readFileSync(htmlOutputPath, "utf8");

    // by default use these metadata
    var metadata = JSON.parse(fse.readFileSync(path.join(__dirname, "..", "templates", "meta.json")));

    // add on the meta data in the project dir
    var metadataFilePath = path.join(projectDir, "meta.json");
    if (fs.existsSync(metadataFilePath)) {
      var metadataString = fse.readFileSync(metadataFilePath);
      var metadataCustom = JSON.parse(metadataString);

      metadata = {
        ...metadata,
        ...metadataCustom
      };
    }

    var headHtml = htmlWithMetadata(metadata);

    injectHTML(outputHtmlString, {
      headEnd: headHtml
    });

    fse.writeFileSync(htmlOutputPath, outputHtmlString);
    console.log("injected metadata into html file")
  default:
    break;

}

switch(entryFile.type) {
  case 'html':

    // GRAB all js files in directory
    const jsFiles = fs.readdirSync(outputDir)
      .filter((filename) => /.js$/.test(filename));
    console.log("ALL JS FILES TO COMPILE: ", jsFiles);

    var bundleFiles = jsFiles.map(file => path.join(outputDir, file));

    esbuild.buildSync({
        entryPoints: bundleFiles,
        bundle: true,
        outdir: outputDir,
        minify: true,
        treeShaking: true,
        format: "esm",
        allowOverwrite: true,
        splitting: true,
    });
    console.log("Done compiling js files");
    console.log("WRITTEN JS FILES TO: ", bundleFiles);

    console.log("Done")

    break;
  case 'jsx':
    console.log("Building for jsx");

    if (!fs.existsSync(outputDir))
      mkdirp.mkdirpSync(outputDir);

    fse.copySync(projectDir, outputDir);
    console.log("Copied directory");

    esbuild
        .buildSync({
            entryPoints: [outputFile],
            bundle: true,
            minify: true,
            treeShaking: true,
            outfile: path.join(outputDir, "bundle.js"), // will bundle into bundle.js
        })

        // Remove jsx file from output folder
        if (fs.existsSync(outputFile)) {
          fs.rmSync(outputFile);
        }
        fs.rmSync(path.join(outputDir, "meta.json"));

        console.log("Done")
    break;
  case 'js':
    console.log("Building for js");

    if (!fs.existsSync(outputDir))
      mkdirp.mkdirpSync(outputDir);

    fse.copySync(projectDir, outputDir);
    console.log("copied over!");


    //////////////////////////////////////////////////////
    // Compiling js file
    //////////////////////////////////////////////////////

    const bundleOutputPath = path.join(outputDir, 'bundle.js');

    var b = browserify(entryFile.name, {
      plugin: [esmify],
      transform: [
        glslify,
        babelify
      ],
      debug: false
    });

    b.bundle()
      // .pipe(minifyStream({sourceMap: false}))
      .pipe(fs.createWriteStream(bundleOutputPath));

    console.log("bundle.js generated")
    
    const removeJsFiles = fs.readdirSync(outputDir)
      .filter((filename) => (/.js$/.test(filename) && !/^bundle./.test(filename)));

    removeJsFiles.map(file => {
      fs.rmSync(path.join(outputDir, file));
    })
    fs.rmSync(path.join(outputDir, "meta.json"));
    console.log("Removed JS files: ", removeJsFiles);

    console.log("Done")
    break;
  default:
    assert(entryFile.type, 'Unknown filetype for file "' + entryFile.name + '"');
}