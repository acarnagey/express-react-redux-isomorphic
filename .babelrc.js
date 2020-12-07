const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: "current",
      },
    },
  ],
  ["@babel/preset-react"],
];

const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-async-to-generator",
  "@babel/plugin-transform-runtime",
];

const addConfigs = {
  sourceMaps: "inline",
  retainLines: true,
};

module.exports = { plugins, presets, ...addConfigs };
