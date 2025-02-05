import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (dateString: string) => {
  const date = dayjs.utc(dateString).tz("Asia/Seoul");

  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return [`${year}년 ${month}월 ${day}일`, day];
};

export const formatTime = (dateString: string) => {
  const date = dayjs.utc(dateString).tz("Asia/Seoul");

  let hours = date.hour();
  const minutes = date.minute();

  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  return `${period} ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};
