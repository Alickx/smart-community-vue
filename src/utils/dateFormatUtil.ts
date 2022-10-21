import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

/**
 *
 * @param date 时间对象
 * @param format 格式字符串
 * @returns 格式化后的时间字符串
 */
export const dateFormat = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

/**
 * 格式化 - 相对时间
 * @param date 时间对象
 * @returns 格式化后的时间字符串
 * @example 1分钟前
 */
export const dateFormatDay = (date: string | Date) => {
  return dayjs(date).fromNow();
};

/**
 * 格式化时间 - 默认格式
 * @param date 时间对象
 * @returns 格式化后的时间字符串
 * @example 2021-01-01 00:00:00
 */
export const dataFormat = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
