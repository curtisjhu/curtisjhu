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
var projectDest = path.join(__dirname, "..", projectDir);

switch (entryFile.type) {
    case "html":
        console.log("Serving as raw HTML");

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

        esbuild
            .context({
                entryPoints: [path.join(projectDest, "index.jsx")],
                bundle: true,
                minify: true,
                treeShaking: true,
                outfile: path.join(projectDest, "bundle.js"),
            })
            .then((context) => {
                console.log("Serving on port 4000");

                context.serve({
                    port: port,
                    host: host,
                    servedir: projectDest,
                });
            });
        break;

    case "js":
        console.log("Serving as JavaScript");

        var hasCss = fs.existsSync(path.join(projectDest, "index.css"));

        budo(entryFile.name, {
            dir: projectDest,
            live: true,
            open: true,
            host: host,
            port: port,
            css: hasCss ? "index.css" : null,
            stream: process.stdout,
            debug: true,
            verbose: true,
            browserify: {
                transform: [
                    [glslify],
                    [babelify, { presets: ["@babel/preset-env"] }],
                ],
            },
        });
        break;
    case "mdx":
        console.log("Serving mdx...");

        if (!fs.existsSync(path.join(projectDest, "index.html"))) {
            throw new Error("NEEDS HTML FILE TO SERVE");
        }

        import("@mdx-js/esbuild").then((mdx) => {
            esbuild
                .context({
                    entryPoints: [path.join(projectDest, "index.mdx")],
                    outfile: path.join(projectDest, "bundle.js"),
                    plugins: [mdx.default({})],
                    bundle: true,
                    minify: true,
                    treeShaking: true,
                })
                .then((context) => {
                    console.log("Serving on port 4000");
                    context.serve({
                        port: port,
                        host: host,
                        servedir: projectDest,
                    });
                });
        });
        break;

    default:
        assert(
            entryFile.type,
            'Unknown filetype for file "' + entryFile.name + '"'
        );
}
