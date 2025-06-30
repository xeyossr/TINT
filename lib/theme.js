const fs = require("fs");
const path = require("path"); 
const { colors } = require("./logger");

async function loadThemePalette(options) {
    let palette = [];
    const projectRoot = path.dirname(path.resolve(process.argv[1]));
    const themesPath = path.join(projectRoot, "themes.json");

    if (options.palette) {
        let raw;
        if (fs.existsSync(options.palette)) {
            raw = JSON.parse(fs.readFileSync(options.palette, "utf-8"));
        } else {
            raw = options.palette.split(",").map(Number);
        }

        if (!Array.isArray(raw) || raw.length % 3 !== 0) {
            throw new Error("Custom palette must be a flat RGB array.");
        }

        for (let i = 0; i < raw.length; i += 3) {
            palette.push([raw[i], raw[i + 1], raw[i + 2]]);
        }

        console.log(colors.blue("Using custom palette with"), colors.bold(palette.length), "colors.");
    } else {
        const themes = JSON.parse(fs.readFileSync(themesPath, "utf-8"));
        const rawTheme = themes[options.theme];
        if (!rawTheme) {
            const available = Object.keys(themes).sort();
            let msg = `Theme not found: ${options.theme || "(none)"}\nAvailable themes:\n`;
            available.forEach(t => msg += ` - ${t}\n`);
            throw new Error(msg);
        }

        for (let i = 0; i < rawTheme.length; i += 3) {
            palette.push([rawTheme[i], rawTheme[i + 1], rawTheme[i + 2]]);
        }

        console.log(colors.blue("Using theme:"), colors.bold(options.theme));
    }

    return palette;
}

module.exports = { loadThemePalette };

