"use client";
import { ChartAreaInteractive } from "@/components/home/ChartHome";
import { DataTableDemo } from "@/components/home/TableListHome";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="p-4  h-full flex flex-col gap-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardItem
          className=""
          title="Tổng tiền đã nhận"
          amount=" + 12,345.67"
          description="Tổng số tiền đã nhận"
        />
        <CardItem
          className="text-red-500"
          title="Tổng tiền đã tiêu"
          amount=" - 12,345.67"
          description="Tổng số tiền đã tiêu"
        />
        <CardItem
          className="text-orange-500"
          title="Số tiền còn lại"
          amount="12,345.67"
          description="Tổng số tiền còn lại của tháng này"
        />
        <CardItem
          className="text-red-500"
          title="Chi tiêu tháng này"
          amount=" - 12,345.67"
          description="Tổng số tiền đã chi tháng này"
        />
      </div>

      <ChartAreaInteractive />

      <DataTableDemo />
    </div>
  );
}

const CardItem = (props: {
  className?: string;
  title: string;
  amount: string;
  description?: string;
}) => {
  const { className, title, amount, description } = props;
  return (
    <div className="bg-card p-6 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm @container/card">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3
          className={cn(
            "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-500",
            className
          )}
        >
          ${amount}
        </h3>

        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
    </div>
  );
};
