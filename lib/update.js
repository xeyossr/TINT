const https = require("https");
const { log, error } = require("./logger");

function checkForUpdate(REPO, currentVersion, callback) {
    const options = {
        hostname: "api.github.com",
        path: `/repos/${REPO}/releases/latest`,
        headers: { "User-Agent": "TINT" }
    };

    https.get(options, (res) => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => {
            try {
                const json = JSON.parse(data);
                const latest = json.tag_name.replace(/^v/, "");
                if (latest !== currentVersion) {
                    callback({ current: currentVersion, latest });
                } else {
                    callback(null);
                }
            } catch {
                callback(null);
            }
        });
    }).on("error", () => callback(null));
}

function handleUpdate(REPO) {
    const cp = require("child_process");
    try {
        log("Updating TINT from GitHub...");
        cp.execSync(`npm install -g github:${REPO}`, { stdio: "inherit" });
        log("✓ TINT has been updated.");
    } catch (err) {
        error("Update failed:", err.message);
    }
}

module.exports = { checkForUpdate, handleUpdate };
