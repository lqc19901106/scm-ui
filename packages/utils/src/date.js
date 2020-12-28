const DEFAULT_FORMAT = 'YYYY-MM-dd HH:mm:ss';
const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const padStart = (string, length, pad) => {
  const s = String(string);
  if (!s || s.length >= length) return string;
  return `${Array(length + 1 - s.length).join(pad)}${string}`;
};

const utils = {
  format(formatStr) {
    let str = formatStr || DEFAULT_FORMAT;
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const date = this.getDate();
    const hour = this.getHours();
    const minute = this.getMinutes();
    const second = this.getSeconds();
    const ms = this.getMilliseconds();
    const matches = {
      YY: (year + '').slice(-2),
      YYYY: year,
      yy: (year + '').slice(-2),
      yyyy: year,
      M: month,
      MM: padStart(month, 2, '0'),
      D: date,
      DD: padStart(date, 2, '0'),
      d: padStart(date, 2, '0'),
      dd: padStart(date, 2, '0'),
      H: this.getHours(),
      HH: padStart(hour, 2, '0'),
      m: minute,
      mm: padStart(minute, 2, '0'),
      s: second,
      ss: padStart(second, 2, '0'),
      SSS: padStart(ms, 3, '0'),
    };

    return str.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match]);
  },
  equal(date, units) {
    let unit = 1000;
    let year = this.getFullYear(),
      eqYear = date.getFullYear();
    let month = this.getMonth(),
      eqMonth = date.getMonth();
    switch (units) {
      case 'y':
        return year === eqYear;
      case 'Y':
        return year === eqYear;
      case 'M':
        return year === eqYear && month === eqMonth;
      case 'D':
        unit = unit * 60 * 60 * 24;
        break;
      case 'd':
        unit = unit * 60 * 60 * 24;
        break;
      case 'h':
        unit = unit * 60 * 60;
        break;
      case 'H':
        unit = unit * 60 * 60;
        break;
      case 'm':
        unit = unit * 60;
      default:
        break;
    }
    return Math.floor(this.valueOf() / unit) === Math.floor(date.valueOf() / unit);
  },
  add(number, units = 'd') {
    let year = this.getFullYear();
    let month = this.getMonth();
    switch (units) {
      case 'y':
        year = year + number;
        break;
      case 'Y':
        year = year + number;
        break;
      case 'M':
        month = month + number;
        break;
      case 'D':
        return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * number);
      case 'd':
        return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * number);
      case 'h':
        return new Date(this.valueOf() + 1000 * 60 * 60 * number);
      case 'H':
        return new Date(this.valueOf() + 1000 * 60 * 60 * number);
      case 'm':
        return new Date(this.valueOf() + 1000 * 60 * number);
      case 's':
        return new Date(this.valueOf() + 1000 * number);
      case 'S':
        return new Date(this.valueOf() + 1000 * number);
      default:
        break;
    }
  },
  getMonthLastDate() {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const date = new Date(year, month, 1);
    return new Date(date.getTime() - 60 * 60 * 24);
  },
  isBefore(date) {
    return this.valueOf() <= date.valueOf();
  },
  isAfter(date) {
    return this.valueOf() >= date.valueOf();
  },
  today() {
    return new Date();
  },
  unix() {
    return Math.floor(this.valueOf() / 1000);
  },
  valueOf() {
    return this.getTime();
  },
  toString() {
    return this.toUTCString();
  },
};
Object.assign(Date.prototype, utils);
