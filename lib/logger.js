let getUpdateInfo = () => null;

const colors = {
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`,
    reset: (text) => `\x1b[0m${text}`
};

function setupLogger(getUpdateFn) {
    getUpdateInfo = getUpdateFn;
}

function showUpdateNotice(info) {
    if (!info) return;
    console.log(`${colors.blue("[notice]")} A new release of TINT is available: ${colors.red(info.current)} ${colors.reset("->")} ${colors.green(info.latest)}`);
    console.log(`${colors.blue("[notice]")} To update, run: ${colors.green("tint --update")}`);
}

function log(...args) {
    console.log(...args);
    const info = getUpdateInfo();
    if (info) showUpdateNotice(info);
}

function error(...args) {
    console.error(colors.red("ERROR:"), ...args);
    const info = getUpdateInfo();
    if (info) showUpdateNotice(info);
}

module.exports = {
    log, error, colors, setupLogger
};

