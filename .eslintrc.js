let isProduction = process.env.NODE_ENV === 'production';

let config = {
    /**
     * 是否为根目录
     * @description ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
     * @type {object}
     * @default false
     */
    root: true,
    /**
     * @description ESLint 允许你指定你想要支持的 JavaScript 语言选项。
     * 默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。
     */
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: '',
        ecmaFeatures: {
            jsx: true
        }
    },
    /**
     * 预定义的全局变量
     * @description 每个环境都带有一组预定义的全局变量
     * @type {object}
     * @link https://eslint.bootcss.com/docs/user-guide/configuring#specifying-environments
     */
    env: {
        browser: true,
        node: true,
        es6: true
    },
    /**
     * 脚本在执行期间访问的其他全局变量
     * @description 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。
     * 如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。
     * @type {Object}
     * @example { var1: true, var2: false }
     * @description true === 'writable'-允许重写变量 false === 'readonly'-'允许重写变量'
     */
    globals: {},
    /**
     * ESLint 支持使用第三方插件
     * @description 在使用插件之前，你必须使用 npm 安装它，
     * 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀
     */
    plugins: [
        'vue'
    ],
    /**
     * 启用哪些规则以及错误级别
     * @description ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则
     * 要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
     * @example "off" 或 0 - 关闭规则
     * @example "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * @example "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     * @type {object}
     * @link https://cloud.tencent.com/developer/chapter/12618
     */
    rules: {
        /**
         * 此规则强制执行统一的行结尾，而不受操作系统，VCS 或整个代码库中使用的编辑器的影响。
         * @description 许多版本控制系统（如 git 和 subversion）可以自动确保正确的结局。
         * 但为了涵盖所有意外情况，您可以激活此规则。
         * @link https://cloud.tencent.com/developer/section/1135633
         */
        'linebreak-style': ['warn', 'unix'],
        /**
         * 此规则旨在通过确保将块语句包装在花括号中来防止错误并提高代码清晰度。当它遇到忽略大括号的块时它会发出警告。
         * @description 当一个块只包含一条语句时，JavaScript 允许省略花括号。
         * 然而，很多人认为最好的做法是不要忽略块周围的花括号，即使它们是可选的，因为它可能导致错误并降低代码清晰度。
         * @link https://cloud.tencent.com/developer/section/1135603
         */
        'curly': ['warn', 'all'],
        /**
         * 此规则旨在消除类型不安全的等式操作符
         * @description 使用类型安全的相等运算符===而!==不是常规对==等运算符被认为是好的做法!=
         * @link https://cloud.tencent.com/developer/section/1135608
         */
        'eqeqeq': ['warn', 'always'],
        /**
         * 此规则旨在捕获应该删除的调试代码，并弹出应该用不那么突兀的自定义用户界面替换的UI元素。
         * 因此，当它遇到它会发出警告alert，prompt以及confirm未阴影函数调用。
         * @description JavaScript的alert，confirm和prompt功能被广泛认为是刺耳的UI元素，应该由更适合的定制UI实现替换。
         * 此外，alert经常在调试代码时使用，在部署到生产之前应该将其删除。
         * @link https://cloud.tencent.com/developer/section/1135651
         */
        'no-alert': isProduction ? 'error' : 'off',
        /**
         * 此规则旨在阻止使用已弃用和次优代码，但不允许使用arguments.caller和arguments.callee
         * @description 不可能使用arguments.caller并arguments.callee进行几次代码优化。
         * 在未来的JavaScript版本中它们已被弃用，并且在严格模式下禁止在ECMAScript 5中使用它们。
         * @link https://cloud.tencent.com/developer/section/1135657
         */
        'no-caller': 'error',
        /**
         * 此规则旨在通过禁止使用eval()函数来防止潜在的危险，不必要的和慢速的代码。
         * @description JavaScript的eval()功能是潜在的危险，经常被滥用。
         * eval()在不受信任的代码上使用可以打开一个程序，最多可以进行多种不同的注入攻击 eval()在大多数情况下的使用可以取代对问题更好的替代方法。
         * @link https://cloud.tencent.com/developer/section/1135686
         */
        'no-eval': 'error',
        
    }
};

module.exports = config;