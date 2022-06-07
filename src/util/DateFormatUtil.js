import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
dayjs.locale("zh-cn");
export function DateFormatUtil(str) {
    return dayjs(str).format('YYYY-MM-DD');
}