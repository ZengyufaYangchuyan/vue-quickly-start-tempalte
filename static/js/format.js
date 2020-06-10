/**
* 格式化时间
* @param {Any} timestamp 时间戳
* @param {String} formatStr 结果的字符串模板 yyyy-MM-dd hh:mm:ss  yyyy-MM-dd 等等 默认为yyyy-MM-dd hh:mm:ss
*/
export const formatDate = (timestamp, formatStr = 'yyyy-MM-dd hh:mm:ss') => {
  if (!timestamp) {
    return '-';
  }
  let d = new Date();
  d.setTime(timestamp);
  let obj = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S+': d.getMilliseconds()
  };
  if (/(y+)/i.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in obj) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1
        ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length));
    }
  }
  return formatStr;
};
