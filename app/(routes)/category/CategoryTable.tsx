"use client";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ICategory, IResponsePagi } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";

const CategoryTable = () => {
  const { data } = useQuery<IResponsePagi<ICategory>>({
    queryKey: ["categories", "list"],
    queryFn: async () => {
      const { data } = await axios.get("/api/category?" + "size=20");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const columns: ColumnDef<ICategory>[] = [
    {
      header: "STT",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy"),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link
              href={`/category/modal/${payment.id}`}
              className="cursor-pointer"
            >
              <Button variant={"secondary"} className="cursor-pointer">
                Sửa
              </Button>
            </Link>
            {/* <Button>Xoá</Button> */}
          </div>
        );
      },
    },
  ];

  return (
    <Card className="p-4">
      <DataTable
        data={data?.data || []}
        columns={columns}
        pagination={{
          total: data?.pagination.total || 0,
          page: data?.pagination.page || 1,
          size: data?.pagination.size || 10,
          totalPages: data?.pagination.totalPages || 0,
          onPageChange: (page) => {
            // Handle page change
          },
          onPageSizeChange: (size) => {
            // Handle page size change
          },
        }}
      />
    </Card>
  );
};

export default CategoryTable;
