let config = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 2
      }
    ]
  ]
};

module.exports = config;
