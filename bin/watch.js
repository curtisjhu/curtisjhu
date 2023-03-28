#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_entry_file_1 = __importDefault(require("./util/get-entry-file"));
const glslify_1 = __importDefault(require("glslify"));
const babelify_1 = __importDefault(require("babelify"));
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const budo_1 = __importDefault(require("budo"));
const fs_1 = __importDefault(require("fs"));
var projectDir = process.argv[2];
console.log(process.argv[1]);
if (!projectDir) {
    throw new Error("You must provide a filepath");
}
if (!/^pages\//.test(projectDir))
    projectDir = path_1.default.join("pages", projectDir);
const entryFile = (0, get_entry_file_1.default)(projectDir);
const port = 4000;
const host = "localhost";
switch (entryFile.type) {
    case "html":
        console.log("Serving as raw HTML");
        (0, budo_1.default)(null, {
            dir: path_1.default.join(__dirname, "..", projectDir),
            live: true,
            open: true,
            host: host,
            port: port,
            stream: process.stdout,
        });
        break;
    case "js":
        console.log("Serving as JavaScript");
        var hasCss = fs_1.default.existsSync(path_1.default.join(__dirname, "..", projectDir, "index.css"));
        (0, budo_1.default)(path_1.default.join(__dirname, "..", projectDir, entryFile.name), {
            dir: path_1.default.join(__dirname, "..", projectDir),
            live: true,
            open: true,
            host: "localhost",
            port: port,
            css: hasCss ? "index.css" : null,
            stream: process.stdout,
            browserify: {
                transform: [
                    [glslify_1.default],
                    [babelify_1.default, { presets: ["@babel/preset-env"] }],
                ],
            },
        });
        break;
    default:
        (0, assert_1.default)(entryFile.type, 'Unknown filetype for file "' + entryFile.name + '"');
}
