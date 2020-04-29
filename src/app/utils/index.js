export const secondToTime = (second) => {
  let secondNumber = +second;
  if (isNaN(secondNumber)) secondNumber = 0;
  let hours = Math.floor(secondNumber / 3600);
  let minutes = Math.floor((secondNumber - hours * 3600) / 60);
  let seconds = secondNumber - hours * 3600 - minutes * 60;

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
};
