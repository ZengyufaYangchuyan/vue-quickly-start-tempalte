const path = require('path');

let config = {
    favicon: false,
    title: 'an vue quickly start tempalte',
    filename: 'index.html',
    inject: 'body',
    meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    template: path.resolve('../../../', 'index.html')
};

export default config;