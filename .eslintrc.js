module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
    ],
    rules: {
        "@typescript-eslint/no-inferrable-types": [
            "warn",
            {
                ignoreParameters: true,
                ignoreProperties: true,
            },
        ],
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
    },
};
