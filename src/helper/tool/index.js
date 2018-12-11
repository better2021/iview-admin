import * as handleDate from './handleDate';

export const computeDay = handleDate.computeDay;
export const computeMonth = handleDate.computeMonth;
export const getCurrentWeek = handleDate.getCurrentWeek;
export const getLastWeek = handleDate.getLastWeek;
export const getCurrentMonth = handleDate.getCurrentMonth;
export const getLastMonth = handleDate.getLastMonth;

import * as formatMath from './formatMath';

export const MathAdd = formatMath.MathAdd;
export const MathSub = formatMath.MathSub;
export const MathMul = formatMath.MathMul;
export const MathDiv = formatMath.MathDiv;

// 设置标题
export function setTitle(title) {
  document.title = title;
}

// 日期转string  2018-10-10
export function formatDateToString(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
}

// 日期转string  2018-10-10 00:00:00
export function formatDateTimeToString(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d} ${hour}:${minute}:${second}`;
}

// 日期转string   00:00:00
export function formatDateMinuteToString(date) {
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return `${hour}:${minute}:${second}`;
}

/**
 *
 * 序列化请求参数
 * @export
 * @param {string} url
 * @param {object} query
 * @returns
 */
export function formatUrl(url, query) {
  if (!query || !Object.keys(query).length) {
    return url;
  }
  let params = Object.keys(query)
    .filter(x => query[x] !== '')
    .map(x => {
      if (query[x] instanceof Date) {
        return `${x}=${formatDateToString(query[x])}`;
      }
      return `${x}=${query[x]}`;
    })
    .join('&');
  return `${url}?${params}`;
}

let reData = {};
/**
 *
 * 是否重复操作
 * @export
 * @param {string} [name='default'] 操作标识符
 * @param {number} [time=300] 间隔时间
 * @returns
 */
export function isRepeat(name = 'default', time = 300) {
  let i = new Date();
  let re = i - (isNaN(reData[name]) ? 0 : reData[name]);
  reData[name] = i;
  return re <= time;
}
