import React from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import { productGroupsUrl, productsUrl, fetchJSON, ProductType, ProductGroupsResponse, ProductsResponse } from "../utils/util";
import useSWR from "swr";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";


const pColumnHelper = createColumnHelper<ProductType>();

const columns = [
  pColumnHelper.accessor("pId", {
    header: "Id",
    cell: (info) => (
      <a href={"/product/" + info.row.original.pgId + "/" + info.getValue()}> {info.getValue()} </a>
    ),
  }),
  pColumnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: () => "Title",
  }),
];

function ProductsTable({
  products,
}: {
  products: ProductType[];
}) {
  // setData is not used, but it is required.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState(() => products);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>      
    </div>
  );
}

// Compare products.tsx (SWR) with product.tsx (loader pattern).

export default function Products() {
  const { pgId } = useParams();
  const pgIdNum = parseInt(pgId || "-1");
  const productGroupsSWR = useSWR<ProductGroupsResponse>(productGroupsUrl, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;
  const pgName = productGroups?.find((pg) => pg.pgId === pgIdNum)?.name ||"";
  const title = "Products - " + pgName;
  const productsUrlWithPgId = productsUrl + `/${pgId}`;
  const productsSWR = useSWR<ProductsResponse>(productsUrlWithPgId, fetchJSON);
  const products = productsSWR.data?.products;

  return (
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left text-lg font-bold p-4">
          {title}
        </p>

        <div className="p-4">
          {products && (
            <ProductsTable products={products} />
          )}

        </div>
      </div>
    </div>
  );
}
