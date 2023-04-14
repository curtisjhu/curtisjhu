#!/usr/bin/env node


/**
 * USAGE:
 * 
 * npm run copy [Project Dir] [OPTIONS]
 * 
 * OPTIONS:
 * 	-h, --html 	HTML
 * 	-c, --css   CSS
 * 
 * EXAMPLE:
 * 		- npm run copy index c
 * 		- npm run copy index html
 * 		- npm run copy index css
 * 
 * When running with `npm run...` don't use `-` or `--` because those flags compile with npm command.
 * 
 */


const path = require("path");
const cp = require("cp");
const fs = require('fs');

var projectDir = process.argv[2];
if (!projectDir) {
    throw new Error("Must provide filepath. Format is 'npm run copy [project directory] [OPTIONS]");
}
const templateDir = path.join(__dirname, "..", "templates");

var projectDest = path.join(__dirname, "..", "pages", projectDir);

if (!fs.existsSync(projectDest)) {
	console.log("Creating Directory: ", projectDest);
	fs.mkdirSync(projectDest);
}

/** ARGUMENTS */
var arguments = process.argv.slice(3);

const PARAMS = {
	html: true,
	css: true,
}

if (arguments.length > 0) {

	for (var key of Object.keys(PARAMS)) {
		PARAMS[key] = false;
	}

	for (var arg of arguments) {
		switch (arg) {
			case "html":
			case 'h':
			case "--html":
			case '-h':
				PARAMS["html"] = true;
				break;
			case "css":
			case 'c':
			case "--css":
			case '-c':
				PARAMS["css"] = true;
				break;
			default:
				console.log("IGNORING: " + arg + ", OPTIONS: h or html, c or css");
				break;

		}
	}
}


var htmlPath = path.join(templateDir, "_index.html");
var htmlDest = path.join(projectDest, "index.html");

if (!fs.existsSync(htmlDest) && PARAMS["html"]) {
	console.log("Copying template to: ", htmlDest);
	cp.sync(htmlPath, htmlDest);
}

var cssPath = path.join(templateDir, "milligram.min.css");
var cssDest = path.join(projectDest, "index.css");
var cssMapPath = path.join(templateDir, "milligram.min.css.map");
var cssMapDest = path.join(projectDest, "milligram.min.css.map");

if (!fs.existsSync(cssDest) && !fs.existsSync(cssMapDest) && PARAMS["css"]) {
	console.log("Copying template to: ", cssDest);
	cp.sync(cssPath, cssDest);
	cp.sync(cssMapPath, cssMapDest);
}
