#!/usr/bin/env node

const getEntryFile = require("./util/get-entry-file");
const glslify = require("glslify");
const assert = require("assert");
const babelify = require("babelify");
const path = require("path");
const fs = require("fs");
const budo = require("budo");
const esbuild = require("esbuild");
const esmify = require("esmify");

var projectDir = process.argv[2];
if (!projectDir) {
    throw new Error("Must provide project directory");
}

var projectDest = path.join(__dirname, "..", "pages", projectDir);

const entryFile = getEntryFile(projectDest);

const port = 4000;
const host = "localhost";
console.log("YOUR PROJECT PATH: ", projectDest);

switch (entryFile.type) {
    case "html":
        console.log("Serving as raw HTML");

        budo(null, {
            dir: projectDest,
            live: true,
            open: true,
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
                loader: { ".js": "jsx" },
                jsx: "automatic",
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
            css: hasCss ? "index.css" : null,
            stream: process.stdout,
            debug: true,
            verbose: true,
            browserify: {
                plugin: [esmify],
                transform: [
                    [glslify],
                    [
                        babelify,
                        {
                            presets: ["@babel/preset-env"],
                        },
                    ],
                ],
            },
        });
        break;
    case "mdx":
        // DEPRECATED. I DON"T REALLY USE MDX
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
