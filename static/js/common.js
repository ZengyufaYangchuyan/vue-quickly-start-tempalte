const common = {
  /**
   * @property TOKEN_STRING
   * @description token的key名称
   */
  TOKEN_STRING: 'token_sbc',
  /**
   * @function
   * @description 设置token缓存
   * @param {String} v value
   */
  setToken: v => common.setCookie(common.TOKEN_STRING, v, 'session'),
  /**
   * @function getToken
   * @description 获取token
   */
  getToken: () => common.getCookie(common.TOKEN_STRING),
  /**
   * @function
   * @description 设置cookie缓存
   * @param {String} k key
   * @param {any} v value
   * @param {Number|String} exdays 天数/Session
   */
  setCookie: (k, v, exdays) => {
    let expires = `expires=`;
    if (typeof exdays === 'number') {
      let day = new Date();
      day.setTime(day.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires += day;
    } else {
      expires += exdays;
    }
    document.cookie = `${k}=${v}; ${expires}`;
  },
  /**
   * @function
   * @description 获取cookie缓存
   * @param {String} k key
   */
  getCookie: (k) => {
    let name = `${k}=`;
    let cookieArr = document.cookie.split(';');
    let value = '';
    cookieArr.forEach(item => {
      let trimItem = item.trim();
      if (trimItem.indexOf(name) === 0) {
        value = trimItem.substring(name.length, trimItem.length);
      }
    });
    return value;
  },
  /**
   * @function
   * @description 提示消息（后续可根据项目样式框架，调用对应的消息提示框）
   */
  message: (msg) => {
    console.log(msg);
  }
};

export default common;
