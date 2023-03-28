#!/usr/bin/env node
const path = require("path");
const cp = require("cp");
const fs = require('fs');

var projectDir = process.argv[2];
if (!projectDir) {
    throw new Error("Must provide filepath");
}

var templatePath = path.join(__dirname, "..", "templates", "_app.html");
var projectDest = path.join(__dirname, "..", "pages", projectDir);

if (fs.existsSync(projectDest)) {
	throw new Error("Directory already exists, proceed manually.")
}

fs.mkdirSync(projectDest);

var templateDest = path.join(projectDest, "index.html");

console.log("Copying template to: ", templateDest);
cp.sync(templatePath, templateDest);
