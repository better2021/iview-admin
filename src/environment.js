// dev
let isDev = /^(192\.168|localhost)/.test(window.location.host);

// ssl
const protocol = window.location.protocol.indexOf('https') >= 0 ? 'https://' : 'http://';

// api host
const host = !isDev ? 'jpzima.com' : 'tgtestv.com';

// site name
const name = setting ? setting.name : 'dev';

// default lang
const lang = setting ? setting.lang : 'zh-cn';

// default color theme
const theme = setting ? setting.theme : 0;

if (!isDev) {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
}

console.log('api:', `${protocol}admin-api.${host}`);

export default {
  name,
  isDev,
  lang,
  theme,
  api: `${protocol}admin-api.${host}`
};
