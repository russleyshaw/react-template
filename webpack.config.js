const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const path = require("path");

module.exports = (_, args) => {
    const mode = args.mode || "development";
    const isDevMode = mode === "development";
    const publicPath = process.env.PUBLIC_PATH || "/";

    console.log("Mode: ", mode);
    console.log("Public Path: ", publicPath);

    const plugins = [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new ForkTsCheckerPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.EnvironmentPlugin({
            "process.env.NODE_ENV": JSON.stringify(isDevMode ? "development" : "production"),
            "process.env.DEBUG": JSON.stringify(isDevMode),
        }),
        isDevMode && new webpack.HotModuleReplacementPlugin(),
        isDevMode && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean);

    const devtool = isDevMode ? "eval" : undefined;
    const alias = {};
    const optimization = {
        splitChunks: {
            chunks: "all",
        },
    };

    return {
        mode,
        entry: {
            index: "./src/index.tsx",
        },
        optimization,
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: require.resolve("babel-loader"),
                        options: {
                            cacheDirectory: true,
                            plugins: [isDevMode && require.resolve("react-refresh/babel")].filter(
                                Boolean
                            ),
                        },
                    },
                },
                {
                    test: /\.(svg|ttf|eot)$/i,
                    use: "file-loader",
                },
                {
                    test: /(png|jpg|gif|woff|woff2)/i,
                    use: "url-loader",
                },
                {
                    test: /\.css$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        // Translates CSS into CommonJS
                        "css-loader",
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
        devtool,
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias,
        },
        output: {
            filename: "[name].bundle.js",
            chunkFilename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            publicPath,
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        plugins,
    };
};
