function padWithZeroes(n = 0) {
  return String(n).padStart(2, '0');
}

export function displayTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return [hours, minutes, seconds].map(padWithZeroes).join(':');
}
