import { formatDate, formatTime } from "./time";
import dayjs from "dayjs";

export const chatListTime = (dateString: string) => {
  const date = dayjs.utc(dateString).tz("Asia/Seoul");
  const now = dayjs().tz("Asia/Seoul");

  // 오늘 날짜인지 확인
  const isToday = date.isSame(now, "day");

  // 어제 날짜인지 확인
  const isYesterday = date.isSame(now.subtract(1, "day"), "day");

  if (isToday) {
    return String(formatTime(dateString));
  } else if (isYesterday) {
    return "어제";
  } else {
    return String(formatDate(dateString)[0]);
  }
};
