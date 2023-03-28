#!/usr/bin/env node

const getEntryFile = require('./util/get-entry-file');
const glslify = require('glslify');
const babelify = require('babelify');
const assert = require('assert');
const path = require('path');
const budo = require('budo');
const fs = require('fs');

var projectDir = process.argv[2];
if (!/^src\//.test(projectDir)) projectDir = path.join('src', projectDir);
const entryFile = getEntryFile(projectDir);

const port = process.env.port || 9966;
const host = process.env.host || 'localhost';

switch (entryFile.type) {
  case 'html':
    console.log('Serving as raw HTML');

    budo(null, {
      dir: path.join(__dirname, '..', projectDir),
      live: true,
      open: true,
      host: host,
      port: port,
      stream: process.stdout,
    });
    break;

  case 'js':
    console.log('Serving as JavaScript');

    var hasCss = fs.existsSync(path.join(__dirname, '..', projectDir, 'index.css'));
    budo(path.join(__dirname, '..', projectDir, entryFile.name), {
      dir: path.join(__dirname, '..', projectDir),
      live: true,
      open: true,
      host: 'localhost',
      port: port,
      css: hasCss ? 'index.css' : null,
      stream: process.stdout,
      browserify: {
        transform: [
          [glslify],
          [babelify, {presets: ["@babel/preset-env"]}],
          brfs
        ]
      }
    });
    break;

  case 'md':
    console.log('Serving as Markdown');
    throw new Error('Markdown serving not yet implemented');
    break;

  default:
    assert(entryFile.type, 'Unknown filetype for file "' + entryFile.name + '"');
}