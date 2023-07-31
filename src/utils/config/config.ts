import { PROD_URL } from "@env";

export const API_BASE_URL = __DEV__ ? PROD_URL : PROD_URL;
