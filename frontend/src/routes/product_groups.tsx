import React from "react";
import Header from "../header";
import axios from "axios";
import { hostName, port } from "../utils/util";
import useSWR from "swr";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const url = `http://${hostName}:${port}/product-groups`;

type ProductGroupType = {
  pgId: number;
  name: string;
};

const pgColumnHelper = createColumnHelper<ProductGroupType>();

const columns = [
  pgColumnHelper.accessor("pgId", {
    cell: (info) => info.getValue(),
    header: () => "Id",
  }),
  pgColumnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
];

function ProductGroupsTable({
  productGroups,
}: {
  productGroups: ProductGroupType[];
}) {
  const [data, setData] = React.useState(() => productGroups);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ProductGroupsResponse {
  product_groups: ProductGroupType[];
}

// TODO convert using react-router loader pattern instead.

async function fetchJSON(url: string) {
  const response = await axios.get(url);
  if (response.status === 200 && response.data.ret === "ok")
    return response.data;
  throw new Error(response.data.msg);
}

export default function ProductGroups() {
  const productGroupsSWR = useSWR<ProductGroupsResponse>(url, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">Product Groups</p>
        <div className="p-4">
          {productGroups && (
            <ProductGroupsTable productGroups={productGroups} />
          )}
        </div>
      </div>
    </div>
  );
}
