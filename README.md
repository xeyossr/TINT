# TINT (Terminal Image Normalizer & Tinter)

**TINT** (Terminal Image Normalizer & Tinter) replaces the colors of an image with the closest matches from a palette you choose. This lets you easily adapt any image to fit your desired color scheme. It’s built with **Node.js** and is very easy to use.

TINT comes with several built-in palettes, but you can also provide your own.
See #Usage below for more information.

> [!NOTE]
> **TINT** is still in pre-release.
> If you find any bugs, please report them by opening an issue.

---

## Demo Gallery

| Original                    | Catppuccin Latte                      | Catppuccin Mocha                      | Dracula                        |
| --------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------ |
| ![raw](assets/original.png) | ![latte](assets/catppuccin-latte.png) | ![mocha](assets/catppuccin-mocha.png) | ![dracula](assets/dracula.png) |

| Everforest                           | Gruvbox                        | Kanagawa                         | Rose Pine                         |
| ------------------------------------ | ------------------------------ | -------------------------------- | --------------------------------- |
| ![everforest](assets/everforest.png) | ![gruvbox](assets/gruvbox.png) | ![kanagawa](assets/kanagawa.png) | ![rosepine](assets/rose-pine.png) |

---

## Installation

To install TINT, npm must be installed on your system.

```
sudo npm install -g github:xeyossr/TINT
```

---

## Usage

```bash
Usage: tint [options]

Options:
  -i, --input <path>       input image path
  -o, --output <path>      output image path
  -t, --theme <name>       theme name
  -p, --palette <palette>  custom palette (path to JSON file or flat RGB list)
  --update                 update TINT to the latest version
  -h, --help               display help for command
```

```bash
# Apply a theme to an image
tint -i input.png -o output.png -t "Catppuccin Mocha"

# Use a custom palette (from a file)
tint -i input.jpg -o output.png -p ./my-palette.json

# Use a custom palette (inline RGB list)
tint -i pic.webp -o recolored.png -p "[255,0,0, 0,255,0, 0,0,255]"

# Update to the latest version
tint --update
```

### Themes

Available themes:

```
 - Catppuccin Frappe
 - Catppuccin Latte
 - Catppuccin Macchiato
 - Catppuccin Mocha
 - Dracula
 - Everforest
 - Gruvbox
 - Kanagawa
 - Nord
 - Rose Pine
 - Rose Pine Dawn
 - Rose Pine Moon
 - Solarized
 - Tokyo Night
```

---

## Issues

If you encounter a bug or have a suggestion, please report it via [Issues](https://github.com/xeyossr/TINT/issues).

---

## License

This project is licensed under the GPL-3.0 License. For more details, please refer to the [LICENSE](LICENSE) file.

---
