import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import {
  productUrl,
  ProductType,
  fetchJSONWithToken,
  ProductResponse,
} from "../utils/util";
import { selectLoginStatus, selectToken } from "../utils/login-reducer";
import { RootState } from "../utils/store";
import { useSelector } from "react-redux";
import useSWR from "swr";

// NOTE: Removed react-router loader pattern later when added token functionality.
// See previous commits for the original code.

function ProductTable({
  product,
  productType,
}: {
  product: ProductType;
  productType: string;
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
            <td>{productType === "book" ? "Author" : "Director"}</td>
            <td>
              {productType === "book" ? product.author : product.director}
            </td>
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
            <td>{productType === "book" ? "Language" : "Genre"}</td>
            <td>{productType === "book" ? product.language : product.genre}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Product() {
  const { pgId, pId } = useParams();
  const title = "Product";
  const loginState = selectLoginStatus(
    useSelector((state: RootState) => state),
  );
  const token = selectToken(useSelector((state: RootState) => state));
  const navigate = useNavigate();

  const productUrlWithParams = `${productUrl}/${pgId}/${pId}`;
  const productSWR = useSWR<ProductResponse>(
    [productUrlWithParams, "get", null, token],
    ([url, method, data, token]) =>
      fetchJSONWithToken({ url, method, data, token }),
  );
  const product = productSWR.data?.product;
  // A bit of a hack to get the type of the product, but this is a demo.
  const productType = product?.pgId === 1 ? "book" : "movie";

  useEffect(() => {
    if (!(loginState === "loggedIn" && token)) {
      navigate("/login");
    }
  }, [loginState, navigate, token]);

  if (!(loginState === "loggedIn" && token)) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">{title}</p>

        <div className="p-4">
          {product && (
            <ProductTable product={product} productType={productType} />
          )}
        </div>
      </div>
    </div>
  );
}
