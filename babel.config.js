let config = {
    /**
     * @type {Boolean}
     * @default false
     * @description 指定的目录将用来缓存 loader 的执行结果
     */
    cacheDirectory: true,
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