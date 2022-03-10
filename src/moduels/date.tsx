export const getTimeToDate = (value?:string) => {
  const time = value ? new Date(value) : new Date();

  return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일`;
}

export const getTimeToFull = (value?:string) => {
  const time = value ? new Date(value) : new Date();
  const month = time.getMonth() +1 < 10 ? `0${time.getMonth()+1}` : time.getMonth();
  const day =  time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds =  time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

  return `${time.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const getTimeToShort = (value:string, showSeconds?: boolean) => {
  const time = new Date(value);
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds =  time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

  return showSeconds ? `${hours}:${minutes}:${seconds}`: `${hours}:${minutes}`;
}

export const getTimeBetweenMin = (value1:string, value2: string) => {
  const gap = (new Date(value2).getTime() - new Date(value1).getTime()) / 1000;

  if (gap < 60) {
    return true;    
  } else {
    return false;
  }
}

export const getTimeForList = (value:string) => {
  const today = getTimeToFull();
  const valueDay = getTimeToFull(value);

  if (today === valueDay) {
    return getTimeToShort(value);
  } else {
    const days = ["월","화", "수", "목", "금", "토", "일"];
    const getDay = days[new Date(value).getDay()-1];
    return `${getDay}요일`;
  }
}
