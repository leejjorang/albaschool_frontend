export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return [`${year}년 ${month+1}월 ${day}일`, day];
}

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  return `${period} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}