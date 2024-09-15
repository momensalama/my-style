# 0.4 / 2023-09-15

- Upgraded to manifest_version 3
- Modularized codebase using IIFE (StyleEditor module)
- Modernized JavaScript (const/let, arrow functions)
- Improved code organization and readability
- Enhanced modularity with focused functions
- Centralized constants and setup functions
- Refined existing features (selector generation, style extraction)
- Maintained core functionality (in-browser editing, storage, shortcuts)

# 0.3 / 2013-03-27

- Update version to 0.3.
- Only throttle when saving styles to local storage. Let updates to style tag go through for quick previewing.
- Make styles !important to prevent site's stylesheet for overriding.
- Automatically fill in selector by alt + clicking element.
- Save CSS less frequently. Handle change event so copy-pasting saves CSS.
- Maintain editor's left-to-right direction even on right-to-left websites.

# 0.2 / 2013-03-27

- Update README with new shortcut.
- Update extension version to 0.2.
- Switch shortcut to control + m for Windows support.

# 0.1 / 2013-03-27

- Remove Chrome extension file (.crx) in favor of the Chrome web store.
- Add installation instructions.
- Improve README usage instructions.
- Move extension files into separate directory. Generate packed extension.
- Fix typo in README.
- Add further usage instructions to README.
- Add README and LICENSE.
- Add help message.
- Factor out constants. Add further documentation.
- Run script at document_start to provide snappier CSS injection.
- Initial commit.
