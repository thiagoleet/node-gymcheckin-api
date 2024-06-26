export function validLatiude(value: number) {
  return Math.abs(value) >= -90 && Math.abs(value) <= 90;
}

export function validLongitude(value: number) {
  return Math.abs(value) >= -180 && Math.abs(value) <= 180;
}
