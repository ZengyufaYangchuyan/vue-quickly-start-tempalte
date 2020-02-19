const setStyleLoader = (test, loader) => {
    let config = {
        test,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            }
        ]
    };
    if (typeof loader === 'string' || typeof loader === 'object') {
        config.use.push(loader)
    }
    return config;
};


let config = [
    setStyleLoader(/\.css/),
    setStyleLoader(/\.less/, { loader: 'less-loader'})
];
console.log(config);
module.exports = config;