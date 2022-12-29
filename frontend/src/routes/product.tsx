import React from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import { productUrl, fetchJSON, ProductType, ProductResponse } from "../utils/util";
import useSWR from "swr";

// TODO convert using react-router loader pattern instead.

export default function Product() {
  const { pgId, pId } = useParams();
  const productUrlWithIds = productUrl + `/${pgId}` + `/${pId}`;
  const productSWR = useSWR<ProductResponse>(productUrlWithIds, fetchJSON);
  const product = productSWR.data?.product;
  const title = "Product";

  function ProductTable({
    product,
  }: {
    product: ProductType;
  }) {
    // setData is not used, but it is required.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
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
                <td>Author/Director</td>
                <td>{product.authorOrDirector}</td>
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
                <td>Language/Genre</td>
                <td>{product.languageOrGenre}</td>
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


