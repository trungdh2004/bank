import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { IPagination } from "@/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Paginations from "./Pagination";

interface IPagi extends IPagination {
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: IPagi;
}

const PAGESIZE = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const DataTable = <TData extends RowData>({
  data,
  columns,
  pagination,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/20">
          <div>
            <Paginations
              pageCount={pagination.totalPages}
              forcePage={pagination.page}
              handlePageClick={({ selected }) => {
                pagination.onPageChange(selected + 1);
              }}
              size="sm"
            />
          </div>

          <Select
            onValueChange={(value) => {
              pagination.onPageSizeChange(Number(value));
            }}
            value={`${pagination.size}`}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn số lượng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Phân trang</SelectLabel>
                {PAGESIZE?.map((item) => (
                  <SelectItem value={`${item.value}`} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default DataTable;
