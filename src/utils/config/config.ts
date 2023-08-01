import { DEV_URL, PROD_URL } from "@env";

console.log(PROD_URL)
console.log(DEV_URL)

export const API_BASE_URL = __DEV__ ? PROD_URL : PROD_URL;
