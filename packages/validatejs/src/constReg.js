// 整数
export const integer = /^\d+?/;

//浮点数
export const float = /^(-?\d+)(\.\d+)?$/;

// 大写字母
export const upperCase = /[A-Z]/g;

// 小写字母
export const lowerCase = /[a-z]/g;

// 汉字
export const CNCharacter = /[^\[\u4e00-\u9fa5]/g;

// 手机号码
export const mobile = /^(13[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;

// 电话号码
export const telephone = /\d{3}-\d{8}|\d{4}-\d{7}/;

// Email邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// 身份证
export const ID = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/;

// 空白行
export const whitespace = /\n\s*\r/g;

// ip地址
export const IPAddr = /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/;

// 地址url
export const URL = new RegExp(
  "^((https?|ftp|file)://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$"
);
