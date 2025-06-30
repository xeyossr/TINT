const fs = require("fs");
const getPixels = require("get-pixels");
const savePixels = require("save-pixels");
const ndarray = require("ndarray");
const { error, log, colors } = require("./logger");
const sharp = require("sharp");

function nearestColor([r, g, b], palette) {
    let minDist = Infinity;
    let closest = [0, 0, 0];

    for (const [tr, tg, tb] of palette) {
        const dist = Math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2);
        if (dist < minDist) {
            minDist = dist;
            closest = [tr, tg, tb];
        }
    }

    return closest;
}

function processImage(inputPath, outputPath, palette) {
    // sharp ile görseli okuma
    sharp(inputPath)
        .ensureAlpha() // Görselde alpha kanalı ekle (varsa)
        .raw() // Ham pikselleri elde et
        .toBuffer((err, data, info) => {
            if (err) {
                error(`Failed to load image:`, err.message || err);
                process.exit(1);
            }

            const width = info.width;
            const height = info.height;
            const out = ndarray(data, [width, height, info.channels]);

            // Piksel işleme
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const r = out.get(x, y, 0);
                    const g = out.get(x, y, 1);
                    const b = out.get(x, y, 2);
                    const a = info.channels === 4 ? out.get(x, y, 3) : 255;

                    const [nr, ng, nb] = nearestColor([r, g, b], palette);

                    out.set(x, y, 0, nr);
                    out.set(x, y, 1, ng);
                    out.set(x, y, 2, nb);
                    out.set(x, y, 3, a);
                }
            }

            // Yeni görseli kaydet
            sharp(out)
                const flatBuffer = Buffer.from(out.data);

                sharp(flatBuffer, {
                    raw: {
                        width,
                        height,
                        channels: 4, // RGBA
                    },
                })
                .toFormat(outputPath.endsWith(".jpg") ? "jpeg" : "png") // formatı uzantıya göre seç
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        error(`Failed to save image:`, err.message || err);
                    } else {
                        log(colors.green("✓ Image successfully saved to:"), colors.green(outputPath));
                    }
                });
        });
}


module.exports = { processImage };

