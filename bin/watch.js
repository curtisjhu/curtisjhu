#!/usr/bin/env node

const getEntryFile = require("./util/get-entry-file");
const glslify = require("glslify");
const assert = require("assert");
const babelify = require("babelify");
const path = require("path");
const fs = require("fs");
const budo = require("budo");
const esbuild = require("esbuild");

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

        esbuild.buildSync({
            entryPoints: [path.join(projectDest, "main.js")],
            bundle: true,
            outfile: path.join(projectDest, "bundle.js"),
            minify: true,
            treeShaking: true,
            splitting: true,
        });

        budo(null, {
            dir: projectDest,
            live: true,
            open: true,
            host: host,
            port: port,
            stream: process.stdout,
            browserify: {
                transform: [[babelify]],
            },
        });

        break;

    case "jsx":
        console.log("Serving for jsx");

        var projectDest = path.join(__dirname, "..", projectDir);

        esbuild
            .context({
                entryPoints: [path.join(projectDest, "index.jsx")],
                outdir: projectDest,
                bundle: true,
                minify: true,
                treeShaking: true,
            })
            .then((context) => {
                console.log("Serving on port 4000");
                context.serve({
                    port: 4000,
                    host: "localhost",
                });
            });

        break;
    case "js":
        console.log("Serving as JavaScript");

        var hasCss = fs.existsSync(
            path.join(__dirname, "..", projectDir, "index.css")
        );

        budo(entryFile.name, {
            dir: path.join(__dirname, "..", projectDir),
            live: true,
            open: true,
            host: host,
            port: port,
            css: hasCss ? "index.css" : null,
            stream: process.stdout,
            debug: true,
            verbose: true,
            browserify: {
                transform: [[glslify], [babelify]],
            },
        });
        break;

    default:
        assert(
            entryFile.type,
            'Unknown filetype for file "' + entryFile.name + '"'
        );
}
