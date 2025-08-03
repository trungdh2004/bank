"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { IExpense, IPagination, IResponsePagi } from "@/type";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const ListExtend = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["expense", "list"],
    queryFn: async () => {
      const query = qs.stringify({
        page: 1,
        size: 100,
        spendMonthId: id, // Assuming id is the spend month ID
      });
      const response = await axios.get<IResponsePagi<IExpense>>(
        "/api/expense?" + query
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
  // const [data, setData] = useState<IExpense[]>([]);
  // const [pagi, setPagi] = useState<IPagination>({
  //   page: 1,
  //   size: 10,
  //   total: 0,
  //   totalPages: 0,
  // });
  // const [search, setSearch] = useState<string>("");

  // const fetchData = async () => {
  //   try {
  //     const query = qs.stringify({
  //       page: pagi.page,
  //       size: pagi.size,
  //     });
  //     const { data } = await axios.get<IResponsePagi<IExpense>>(
  //       "/api/spend/expense?" + query
  //     );
  //     setData(data.data);
  //     setPagi(data.pagination);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [search]);

  return (
    <div className="mt-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {data?.data.map((item: any) => (
          <Card
            key={item.id}
            className={cn(
              "p-4 gap-2 border-red-500",
              item.isAdd && "border-green-500"
            )}
          >
            <h4 className={cn("text-red-500", item.isAdd && "text-green-500")}>
              Tiền: {item.amount}
            </h4>
            <p className="text-sm">
              Thời gian: {format(new Date(item.date), "dd/MM/yyyy HH:mm:ss")}
            </p>
            <p className="text-sm">Mô tả: {item.description}</p>
            <p className="text-sm">Danh mục: {item?.category?.name}</p>
            <p className="text-sm">Ngân hàng: {item?.bank?.name}</p>
            <p className="text-sm">Tháng: {item?.spendMonth?.month}</p>
            <p className="text-sm">Năm: {item?.spendMonth?.year}</p>
          </Card>
        ))}

        {data?.data.length === 0 && (
          <div className="border border-dashed min-h-20 flex items-center justify-center col-span-full">
            Không có ghi chép nào
          </div>
        )}
        {/* <Card className="p-4 gap-2 border-red-500">
          <h4 className="">$ 1,000,000</h4>
          <p className="text-sm">Thời gian: </p>
          <p className="text-sm">Xin chòa</p>
        </Card> */}
      </div>
    </div>
  );
};

export default ListExtend;
