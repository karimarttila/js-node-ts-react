import React from "react";
import Header from "../header";
import axios from "axios";
import { hostName, port } from "../utils/util";

const baseURL = `http://${hostName}:${port}/product-groups`;

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

export default function ProductGroups() {
  const [productGroups, setProductGroups] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log("response", response);
        console.log("product_groups", response.data.product_groups);
        if (response.status === 200 && response.data.ret === "ok")
          setProductGroups(response.data.product_groups);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <Header />
        {productGroups && <ProductGroupsTable productGroups={productGroups} />}
      </div>
    </div>
  );
}
