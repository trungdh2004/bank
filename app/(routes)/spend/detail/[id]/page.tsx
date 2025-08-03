import { db } from "@/lib/prisma";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import ListExtend from "../components/ListExtend";
import { DialogDemo } from "../components/FormExtend";

const PageDetailSpend = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const data = await db.spendMonth.findUnique({
    where: { id },
  });

  if (!data) {
    redirect("/spend");
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xl">
          Danh sách trong tháng {data.month} năm {data.year}
        </h4>

        <DialogDemo />
      </div>

      <ListExtend />
    </div>
  );
};

export default PageDetailSpend;
