import { formatDate, formatTime } from "./time";

export const chatListTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  // 오늘 날짜인지 확인
  const isToday =
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth() &&
    date.getUTCDate() === now.getUTCDate();

  // 어제 날짜인지 확인
  const yesterday = new Date();
  yesterday.setUTCDate(now.getUTCDate() - 1);
  const isYesterday =
    date.getUTCFullYear() === yesterday.getUTCFullYear() &&
    date.getUTCMonth() === yesterday.getUTCMonth() &&
    date.getUTCDate() === yesterday.getUTCDate();

  if (isToday) {
    return `${formatTime(dateString)}`;
  } else if (isYesterday) {
    return "어제";
  } else {
    return `${formatDate(dateString)[0]}`;
  }
};
