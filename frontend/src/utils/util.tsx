import axios from "axios";

// TODO: Muuta tämä pääte: .tsx -> .ts

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

export type BookType = {
  pgId: number;
  pId: number;
  author: string;
  country: string;
  language: string;
  price: number;
  title: string;
  year: number;
};

export type MovieType = {
  pgId: number;
  pId: number;
  Director: string;
  country: string;
  Genre: string;
  price: number;
  title: string;
  year: number;
};

export type ProductType = BookType | MovieType;

export interface ProductsResponse {
  products: ProductType[];
}

export interface ProductResponse {
  product: ProductType;
}

