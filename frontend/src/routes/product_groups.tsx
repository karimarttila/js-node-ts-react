import React from "react";
import Header from "../header";
import axios from "axios";
import { hostName, port } from "../utils/util";
import ReactTable from "react-table";
import useSWR from "swr";

const url = `http://${hostName}:${port}/product-groups`;

type ProductGroupType = {
  pgId: number;
  name: string;
};

function ProductGroupsTable({
  productGroups,
}: {
  productGroups: ProductGroupType[];
}) {
  return (
    <div className="p-4">
      <p className="text-left p-4">PRODUCT GROUPS PAGE</p>
      <pre>{JSON.stringify(productGroups, null, 2)}</pre>
    </div>
  );
}

// TODO convert using react-router loader pattern instead.

async function fetchJSON(url: string) {
  const response = await axios.get(url);
  if (response.status === 200 && response.data.ret === "ok")
    return response.data;
  throw new Error(response.data.msg);
}

export default function ProductGroups() {
  const productGroupsSWR = useSWR(url, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;

  return (
    <div className="App">
      <div>
        <Header />
        {productGroups && <ProductGroupsTable productGroups={productGroups} />}
      </div>
    </div>
  );
}
