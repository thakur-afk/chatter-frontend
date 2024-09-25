import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className=" text-white  overflow-scroll md:overflow-hidden max-sm:text-sm p-5">
      <table className="  border border-gray-700 w-full text-left ">
        <thead className=" bg-indigo-400">
          {table.getHeaderGroups().map((hg, i) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className=" capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length
            ? table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? " bg-gray-900" : " bg-gray-800"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className=" px-3.5 py-3  ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className=" flex items-center justify-center mt-2 gap-2">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          className=" p-1 border border-gray-300 px-2 disabled:opacity-30  bg-blue-400 text-white"
        >
          {"<"}
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          className=" p-1 border border-gray-300 px-2 disabled:opacity-30 bg-blue-400"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Table;
