import environment from '../../environment';
import { formatUrl } from '../tool';

let Fetch = (url, option = {}) => {
  let status = 0;

  option.headers = option.headers || {};
  option.headers['pl'] = 'admin';
  option.headers['Authorization'] = window.localStorage.getItem('token');

  const m = (option.method || '').toLocaleLowerCase();
  // get query format
  if (m === 'get') {
    if (option.query) {
      url = formatUrl(url, option.query);
    }
  }
  // post put data format
  if (m === 'post' || m === 'put' || m === 'patch' || m === 'delete') {
    option.headers['Content-Type'] = option.headers['Content-Type'] || 'application/json';
    option.body = JSON.stringify(option.body);
  }

  return new Promise((resolve, reject) => {
    const fetchUrl = url.includes('http') ? url : environment.api + url;
    fetch(fetchUrl, option)
      .then(response => {
        status = response.status;
        if (response.status >= 500) {
          Fetch.systemError && Fetch.systemError('系统错误');
        }
        return response;
      })
      .then(parseJSON)
      .then(response => {
        response.status = status;

        if (response.status >= 401) {
          if (response.state === 10041) {
            // 登录超时
            Fetch.overTime && Fetch.overTime(response);
          }
          if (response.state === 10042) {
            // 没有权限
            Fetch.overTime && Fetch.overTime(response);
          }
        }

        resolve(response);
      })
      .catch(error => {
        console.log('err', error);
        Fetch.otherError && Fetch.otherError(error.message);
      });
  });
};

function parseJSON(response) {
  return response.json();
}

export default Fetch;
