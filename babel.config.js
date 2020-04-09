let config = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: [
                        'ie >= 6',
                        '>2%',
                        'not dead'
                    ]
                },
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