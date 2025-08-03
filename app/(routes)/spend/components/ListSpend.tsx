"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrencyVND } from "@/lib/func";
import { cn } from "@/lib/utils";
import { IResponsePagi, ISpend } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ListSpend = () => {
  const { data, isLoading } = useQuery<IResponsePagi<ISpend>>({
    queryKey: ["spend", "list"],
    queryFn: async () => {
      const { data } = await axios.get("/api/spend");

      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-20 items-center justify-center">
        <LoaderIcon className="animate-spin" size={20} />
      </div>
    );
  }
  return (
    <div className="pb-6 grid grid-cols-4 gap-4 mt-4">
      {data?.data?.map((spend) => (
        <Card className="gap-4 cursor-pointer" key={spend.id}>
          <div className="px-6 flex items-center justify-between">
            <h4 className="text-xl font-semibold">
              Tháng {spend.month} / {spend.year}
            </h4>

            <span>
              <StarIcon
                size={20}
                className={cn(
                  "text-yellow-500",
                  spend.isRating && "fill-yellow-700"
                )}
              />
            </span>
          </div>
          <CardContent>
            <Link href={`/spend/detail/${spend.id}`}>
              <div className="flex flex-col gap-1">
                <p className="flex items-center justify-between text-green-500">
                  <span>Tiền nhận:</span>
                  <span>${formatCurrencyVND(spend.total)}</span>
                </p>
                <p className="flex items-center justify-between text-red-500">
                  <span>Tiền tiêu:</span>
                  <span>${formatCurrencyVND(spend.tieu)}</span>
                </p>

                <p className="flex items-center justify-between text-gray-500 border-t pt-2">
                  <span>Tiền còn lại:</span>
                  <span>${formatCurrencyVND(spend.tietkiem)}</span>
                </p>
              </div>
            </Link>

            <div className="pt-4 border-t mt-2 flex items-center justify-between">
              <Button variant={"destructive"} disabled={!spend.isRun}>
                Kêt thúc
              </Button>
              <Button disabled={!spend.isRun}>Sửa</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListSpend;
