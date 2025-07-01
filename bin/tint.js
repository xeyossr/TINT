#!/usr/bin/env node

const { program } = require("commander");
const { log, error, setupLogger } = require("../lib/logger");
const { loadThemePalette } = require("../lib/theme");
const { processImage } = require("../lib/image");
const updateNotifier = require('update-notifier').default;
const pkg = require("../package.json");

const notifier = updateNotifier({ pkg });
notifier.notify();

program
    .option("-i, --input <path>", "input image path")
    .option("-o, --output <path>", "output image path")
    .option("-t, --theme <name>", "theme name")
    .option("-p, --palette <palette>", "custom palette (path to JSON file or flat RGB list)")

program.parse(process.argv);
const options = program.opts();

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
