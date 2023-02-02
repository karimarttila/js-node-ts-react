import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Header from "../header";
import { productUrl, ProductType} from "../utils/util";


// Using react-router loader pattern to compare with products.tsx.

type productParams = {
  pgId: string, 
  pId: string
}

export async function productLoader({ params }: { params: productParams }): Promise<ProductType> {
  const { pgId, pId } = params;
  const productUrlWithIds = productUrl + `/${pgId}` + `/${pId}`;
  const product: ProductType = await axios
  .get(productUrlWithIds)
  .then((response) => {
    if (response.status === 200 && response.data.ret === "ok")
      return response.data.product;
  })
  .catch((error) => {
    console.log("error", error);
  });
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return product;  
}

export function Product() {
  const product: ProductType = useLoaderData() as ProductType;
  const title = "Product";
  // A bit of a hack to get the type of the product, but this is a demo.
  const productType = product.pgId === 1 ? "book" : "movie";

  function ProductTable({
    product,
  }: {
    product: ProductType;
  }) {
    return (
      <div className="p-4">
        <table>
          <thead className="font-bold">
            <tr>
              <td>Field</td>
              <td>Value</td>
            </tr> 
            </thead>
            <tbody>
              <tr>             
                <td>pgId</td>
                <td>{product.pgId}</td>
               </tr>
               <tr>             
                <td>pId</td>
                <td>{product.pId}</td>
               </tr>
               <tr>             
                <td>Title</td>
                <td>{product.title}</td>
               </tr>
               <tr>             
                <td>Price</td>
                <td>{product.price}</td>
               </tr>
               <tr>             
                <td>{productType === "book" ? 'Author' : 'Director'}</td>
                <td>{productType === "book" ? product.author : product.director}</td>
               </tr>
               <tr>             
                <td>Year</td>
                <td>{product.year}</td>
               </tr>
               <tr>             
                <td>Country</td>
                <td>{product.country}</td>
               </tr>
               <tr>             
                <td>{productType === "book" ? 'Language' : 'Genre'}</td>
                <td>{productType === "book" ? product.language : product.genre}</td>
               </tr>
            </tbody>
        </table>
      </div>
    );
  }  

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">
          {title}
        </p>

        <div className="p-4">
          {product && (
            <ProductTable product={product} />
          )}

        </div>
      </div>
    </div>
  );
}


