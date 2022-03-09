export const getTimeToFull = (value:string) => {
  const time =new Date(value);

  return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDay()}일`;
}

export const getTimeToShort = (value:string) => {
  const time = new Date(value);
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  return `${hours}:${minutes}`;
}

export const get= (value:string) => {

}
