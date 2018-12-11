//浏览器储存数据方式封装，默认使用localstorage存储，若浏览器不支持则用cookie存储
function checkLocalStorage() {
  //确认是否支持Localstorage
  return window.localStorage &&
    (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') == 123)
    ? true
    : false;
}

var local = {
  set(key, value) {
    if (checkLocalStorage()) {
      window.localStorage.setItem(key, value);
    } else {
      let Days = 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
    }
  },
  get(key) {
    if (checkLocalStorage()) {
      return window.localStorage.getItem(key) ? window.localStorage.getItem(key) : null;
    } else {
      return getCookie(key);
    }
  },
  clear(key) {
    if (checkLocalStorage()) {
      window.localStorage.removeItem(key);
    } else {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = getCookie(key);
      if (cval != null) document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }
};
export default {
  local: local
};
