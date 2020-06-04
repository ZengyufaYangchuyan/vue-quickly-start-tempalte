/**
 * 获取浏览器信息
 */
const getBorwserInfo = () => {
  /**
   * 用户代理字符串
   */
  const ua = navigator.userAgent;
  /**
   * 呈现引擎
   * @description 确切知道浏览器的名字和版本号不如确切知道它使用的是什么呈现引擎。
   * 如果FireFox、Camino 和 Netscape 都使用了相同版本的Gecko，那它们一定支持相同的特性。
   * 类似地，不管是什么浏览器，只要它跟Safari3使用的是同一个版本的Webkit，那么该浏览器也就跟Safari 3具备同样的功能。
   */
  let engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    /**
     * 完整的版本号
     */
    version: null
  };

  /**
   * 浏览器
   * @description 在大多数情况下，识别浏览器的呈现引擎就足以为我们采取正确的操作提供依据了。
   * 可是，只有呈现引擎还不能够说明存在所需的 JavaScript 功能。苹果公司的 Safari 浏览器和谷歌公司的
   * Chrome 浏览器都是使用 Webkit 作为呈现引擎，但他们的 JavaScript 引擎却不一样。
   * 在这两款引擎中，engine 都会返回非0值，但仅知道这一点恐怕还不够。
   */
  let borwser = {
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,
    /**
     * 完整版本号
     */
    version: null
  };

  /**
   * 识别引擎
   * @description 要正确地识别呈现引擎，关键是检测顺序要正确。
   */
  if (window.opera) {
    /**
     * @description 第一步检测：Opera，因为它的用户代理字符串有可能完全模仿其他浏览器。
     * 我们不相信 Opera，是因为（任何情况下）其用户代理字符串（都）不会将自己标识为 Opera。
     * 要识别 Opera，必须检测 window.opera 对象。Opera 5 及更高版本中都有这个对象，用以保存
     * 与浏览器相关的标识信息以及与浏览器直接交互。
     * 在 Opera 7.6 及更高的版本中，调用 version() 方法可以返回一个标识浏览器版本的字符串，
     * 而这也是确定 Opera 版本号的最佳方式。
     * 要检测更早版本的 Opera，可以直接检查用户代理字符串，因为那些版本还不支持隐瞒身份。
     * 不过，2007年底 Opera 的最高版本已经是9.5了，所以不太可能有人还在使用7.6之前的版本。
     */
    engine.version = borwser.version = window.opera.version();
    engine.opera = borwser.opera = parseFloat(engine.version);
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    /**
     * @description 第二步检测：Webkit，因为 Webkit 的用户代理字符穿中包含“Gecko”和“KHTML”
     * 这两个字符串，所以如果先检测它们，很可能会得出错误的结论。
     * 不过，Webkit 的用户代理字符串中“AppleWebkit”是独一无二的，因此检测这个字符串最合适。
     */
    engine.version = borwser.version = RegExp[`$1`];
    engine.webkit = parseFloat(engine.version);

    // 确定是 Chorme 还是 Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      borwser.version = RegExp[`$1`];
      borwser.chrome = parseFloat(borwser.version);
    } else if (/Version\/(\S+)/.test(ua)) {
      borwser.version = RegExp[`$1`];
      borwser.safari = parseFloat(borwser.version);
    } else {
      // 近似的确定版本号
      let safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      } else if (engine.webkit < 312) {
        safariVersion = 1.2;
      } else if (engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }
      borwser.safari = borwser.version = safariVersion;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    /**
     * @description 第三步检测：KHTML。KHTML 的用户代理字符串中也包含“Gecko”，因此
     * 在排除 KHTML 之前，我们无法准确检测基于 Gecko 的浏览器。KHTML 的版本号与Webkit的版本
     * 号在用户代理字符串中的格式差不多，因此可以使用类似的正则表达式。此外，由于Konqueror 3.1
     * 及更早版本中不包含 KHTML 的版本，故而就要使用 Konqueror 的版本来代替。
     */
    engine.version = borwser.version = RegExp[`$1`];
    engine.khtml = borwser.konq = parseFloat(engine.version);
  } else if (/rv:([^\\)]+)\) Gecko\/\d{8}/.test(ua)) {
    /**
     * @description 第四步检测：Gecko。在排除了 Webkit 和 KHTML 之后，就可以准确地检测 Gecko 了。
     * 但是，在用户代理字符串中，Gecko 的版本号不会出现在字符串“Gecko”的后面，而是会出现在字符串“rv:”
     * 的后面。
     */
    engine.version = RegExp[`$1`];
    engine.gecko = parseFloat(engine.version);

    // 确定是不是Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      borwser.version = RegExp[`$1`];
      borwser.firefox = parseFloat(borwser.version);
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    /**
     * @decription 第五步检测：IE。
     * IE的版本号位于字符串“MSIE”的后面和一个分号的前面。
     */
    engine.version = borwser.version = RegExp[`$1`];
    engine.ie = borwser.ie = parseFloat(engine.version);
  }

  /**
   * 平台
   * @description 很多时候，只要知道呈现引擎就足以编写出适当的代码了。
   * 但在某些条件下，平台可能是必须关注的问题。
   */
  let system = {
    win: false,
    mac: false,
    x11: false,
    /**
     * 移动设备
     */
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,
    /**
     * 游戏系统
     */
    wii: false,
    ps: false
  };

  /**
   * 浏览器平台字符串
   */
  const platform = navigator.platform;

  // 平台
  system.win = platform.indexOf('Win') === 0;
  system.mac = platform.indexOf('Mac') === 0;
  system.x11 = platform.indexOf('X11') === 0 || platform.indexOf('Linux') === 0;
  /**
   * 检测windows操作系统
   * @description 如果 system.win 的值为 true，那么就使用这个正则表达式从用户代理字符串中提取具体的信息。
   * 鉴于 Windows 将来的某个版本也许不能使用这个方法来检测，所以第一步应该先检测用户代理字符串是
   * 否与这个模式匹配。在模式匹配的情况下，第一个捕获组中可能会包含'95'、'98'、'9x'或'NT'。如
   * 果这个值是'NT'，可以将 system.win 设置为相应操作系统的字符串；如果是'9x'，那么 system.win
   * 就要设置成'ME'；如果是其他值，则将所捕获的值直接赋给 system.win。
   */
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp['$1'] === 'NT') {
        switch (RegExp['$2']) {
        case '5.0':
          system.win = '2000';
          break;
        case '5.1':
          system.win = 'XP';
          break;
        case '6.0':
          system.win = 'Vista';
          break;
        case '6.1':
          system.win = '7';
          break;
        default:
          system.win = 'NT';
          break;
        }
      } else if (RegExp['$1'] === '9x') {
        system.win = 'ME';
      } else {
        system.win = RegExp['$1'];
      }
    }
  }

  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1;
  system.ipod = ua.indexOf('iPod') > -1;
  system.ipad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('NokiaN') > -1;
  /**
   * 检测IOS版本
   * @description 检查系统是不是 Mac OS、字符串中是否存在'Mobile'，
   * 可以保证无论是什么版本，system.ios中都不会是 0。
   * 然后，再使用正则表达式确定是否存在 iOS 的版本号。
   * 如果有，将 system.ios 设置为表示版本号的浮点值；
   * 否则，将版本设置为 2。（因为没有办法确定到底是什么版本，所以设置为更早的版本比较稳妥。）
   */
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp[`$1`].replace('_', '.'));
    } else {
      system.ios = 2;
    }
  }

  /**
   * 检测Android版本
   * @description 搜索字符串'Android'并取得紧随其后的版本号
   */
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp[`$1`]);
  }

  /**
   * windos移动设备
   */
  if (system.win === 'CE') {
    system.winMobile = system.win;
  } else if (system.win === 'Ph') {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = 'Phone';
      system.winMobile = parseFloat(RegExp['$1']);
    }
  }

  // 游戏系统
  system.wii = ua.indexOf("Wii") > -1;
  system.ps = /playstation/i.test(ua);

  return {
    engine,
    borwser,
    system
  };
};

export default getBorwserInfo();
