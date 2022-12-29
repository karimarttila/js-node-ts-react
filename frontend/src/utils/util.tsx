import axios from "axios";

export const hostName = "localhost";
export const port = "6600";
export const productGroupsUrl = `http://${hostName}:${port}/product-groups`;
export const productsUrl = `http://${hostName}:${port}/products`;
export const productUrl = `http://${hostName}:${port}/product`;

export async function fetchJSON(url: string) {
  const response = await axios.get(url);
  if (response.status === 200 && response.data.ret === "ok")
    return response.data;
  throw new Error(response.data.msg);
}

export type ProductGroupType = {
  pgId: number;
  name: string;
};

export interface ProductGroupsResponse {
  product_groups: ProductGroupType[];
}

export type ProductType = {
  pgId: number;
  pId: number;
  authorOrDirector: string;
  country: string;
  languageOrGenre: string;
  price: number;
  title: string;
  year: number;
};

export interface ProductsResponse {
  products: ProductType[];
}

export interface ProductResponse {
  product: ProductType;
}

