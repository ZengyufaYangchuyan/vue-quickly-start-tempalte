let config = {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ]
};

module.exports = config;