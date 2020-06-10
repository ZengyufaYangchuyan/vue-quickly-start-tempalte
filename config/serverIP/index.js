/**
 * @description 后端IP地址
 */
let api = {
  demo: '8.129.8.196:8010',
  test: '127.0.0.1:95'
};

/**
 * @const domain
 * @description 浏览器当前访问域名
 * */
const domain = document.domain;

/**
 * @const port
 * @description 浏览器当前访问端口号
 */
const port = document.location.port;

/**
 * @let noMatchingDefaultRequest
 * @description 在没有数据匹配时最终设置的请求地址
 * */
const noMatchingDefaultRequest = `test`;

/**
 * @let
 * @description 根据domin动态设置后端api地址
 * */
let requestDomainAndPortToUrlArr = [
  {
    description: '本地访问',
    domian: 'localhost',
    port: {
      default: `test`
    }
  },
  {
    description: '曾宇发',
    domian: '172.16.4.70',
    port: {
      default: `lingShiMin`
    }
  }
];

/**
 * @function setBaseRequest
 * @description 设置基础请求地址
 * @return {String} url
 */
function setBaseRequest(request) {
  return `https://${api[request]}`;
}
/**
 * @function setBaseRequest
 * @description 设置基础请求地址
 * @return {String} url
 */
function setRequest() {
  let requestConfigArr = requestDomainAndPortToUrlArr;
  let isMatch = false;
  let request = '';
  requestConfigArr.forEach(item => {
    let itemDomian = item.domian;
    if (itemDomian === domain) {
      let itemPort = item.port;
      if (itemPort[port]) {
        request = itemPort[port];
      } else {
        request = itemPort['default'];
      }
      isMatch = true;
    }
  });
  if (!isMatch) {
    request = noMatchingDefaultRequest;
  }
  let IP = setBaseRequest(request);
  return IP;
}

let IP = setRequest();

export default IP;
