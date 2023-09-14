/* eslint-env node */
module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "simple-import-sort"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "@typescript-eslint/ban-types": "off",
        "indent": ["off"]
    },

    root: true,
};
