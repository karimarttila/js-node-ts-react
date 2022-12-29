import React from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import { hostName, port, fetchJSON } from "../utils/util";
import useSWR from "swr";

// TODO convert using react-router loader pattern instead.
//{ pgId }: { pgId: number }

export default function Products() {
  const { pgId } = useParams();
  console.log("pgId", pgId);
  //const productGroupsSWR = useSWR<ProductGroupsResponse>(url, fetchJSON);
  //const productGroups = productGroupsSWR.data?.product_groups;

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">
          {"Products - " + pgId}
        </p>
        <div className="p-4"></div>
      </div>
    </div>
  );
}
