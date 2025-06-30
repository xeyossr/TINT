#!/usr/bin/env node

const { program } = require("commander");
const { log, error, setupLogger } = require("../lib/logger");
const { checkForUpdate, showUpdateNotice, handleUpdate } = require("../lib/update");
const { loadThemePalette } = require("../lib/theme");
const { processImage } = require("../lib/image");
const packageJson = require("../package.json");

const CURRENT_VERSION = packageJson.version;
const REPO = "xeyossr/TINT";

let lastUpdateInfo = null;
setupLogger(() => lastUpdateInfo);

program
    .option("-i, --input <path>", "input image path")
    .option("-o, --output <path>", "output image path")
    .option("-t, --theme <name>", "theme name")
    .option("-p, --palette <palette>", "custom palette (path to JSON file or flat RGB list)")
    .option("--update", "update TINT to the latest version");

program.parse(process.argv);
const options = program.opts();

if (options.update) {
    handleUpdate(REPO);
    process.exit(0);
}

if (!options.input || !options.output) {
    program.help({ error: true });
}


checkForUpdate(REPO, CURRENT_VERSION, (info) => {
    lastUpdateInfo = info;
});

loadThemePalette(options)
    .then((themePalette) => {
        processImage(options.input, options.output, themePalette);
    })
    .catch(err => {
        error(err.message);
        process.exit(1);
    });
