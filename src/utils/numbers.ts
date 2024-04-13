export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertToWholeNumber(str: string) {
  const numbersArray = str.split(",");
  const combinedString = numbersArray.join("");
  return parseInt(combinedString);
}
