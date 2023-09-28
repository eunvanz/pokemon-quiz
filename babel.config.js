module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic", importSource: "@emotion/react" }],
  ],
  plugins: [
    "macros",
    "@emotion/babel-plugin",
    [
      "module-resolver",
      {
        alias: {
          "~": "./src",
        },
      },
    ],
  ],
};
