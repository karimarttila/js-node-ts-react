import React from "react";
import Header from "../header";
import { productGroupsUrl, fetchJSON, ProductGroupType, ProductGroupsResponse } from "../utils/util";
import useSWR from "swr";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const pgColumnHelper = createColumnHelper<ProductGroupType>();

const columns = [
  pgColumnHelper.accessor("pgId", {
    header: "Id",
    cell: (info) => (
      <a href={"/products/" + info.getValue()}> {info.getValue()} </a>
    ),
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
  // setData is not used, but it is required.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export default function ProductGroups() {
  const productGroupsSWR = useSWR<ProductGroupsResponse>(
    productGroupsUrl,
    fetchJSON,
  );
  const productGroups = productGroupsSWR.data?.product_groups;
  const title = "Product Groups";

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4"> {title}</p>
        <div className="p-4">
          {productGroups && (
            <ProductGroupsTable productGroups={productGroups} />
          )}
        </div>
      </div>
    </div>
  );
}
