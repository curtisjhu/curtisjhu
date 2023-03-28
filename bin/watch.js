#!/usr/bin/env node

const getEntryFile = require("./util/get-entry-file");
const glslify = require("glslify");
const assert = require("assert");
const babelify = require("babelify");
const path = require("path");
const fs = require("fs");
const budo = require("budo");

var projectDir = process.argv[2];
if (!projectDir) {
    throw new Error("Must provide filepath");
}

if (!/^pages\//.test(projectDir)) projectDir = path.join("pages", projectDir);
const entryFile = getEntryFile(projectDir);

const port = 4000;
const host = "localhost";

switch (entryFile.type) {
    case "html":
        console.log("Serving as raw HTML");

        var projectDest = path.join(__dirname, "..", projectDir);
        
        budo(null, {
            dir: projectDest,
            live: true,
            open: true,
            host: host,
            port: port,
            stream: process.stdout,
        });

        break;

    case "js":
        console.log("Serving as JavaScript");

        var hasCss = fs.existsSync(
            path.join(__dirname, "..", projectDir, "index.css")
        );
        budo(path.join(__dirname, "..", projectDir, entryFile.name), {
            dir: path.join(__dirname, "..", projectDir),
            live: true,
            open: true,
            host: host,
            port: port,
            css: hasCss ? "index.css" : null,
            stream: process.stdout,
            browserify: {
                transform: [
                    [glslify],
                    [
                        babelify,
                        {
                            babelrc: true
                        },
                    ],
                ],
            },
        });
        break;

    default:
        assert(
            entryFile.type,
            'Unknown filetype for file "' + entryFile.name + '"'
        );
}
