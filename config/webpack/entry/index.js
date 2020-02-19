const path = require('path');

let config = {
    /**
    * @description 主入口
    */
    main: path.resolve('../../', 'main.js'),
    /**
    * @description 长效缓存
    */
    vendor: [
        'vue'
    ]
};

export default config;