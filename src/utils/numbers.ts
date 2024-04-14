import { IEventTier } from "../types/Event";

export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertToWholeNumber(str: string) {
  const numbersArray = str.split(",");
  const combinedString = numbersArray.join("");
  return parseInt(combinedString);
}

export function sumTierTickets(arr: IEventTier[]) {
  let totalSum = 0;
  for (const obj of arr) {
    if (obj.hasOwnProperty("numberOfTickets")) {
      // Check if "number" property exists
      totalSum += Number(obj.numberOfTickets);
    }
  }
  return totalSum;
}
