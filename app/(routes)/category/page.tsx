import { Button } from "@/components/ui/button";
import React from "react";
import CategoryTable from "./CategoryTable";
import { ChartPieSeparatorNone } from "./CategoryChart";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold mb-4">Category Page</h1>

        <Link href={"/category/modal/create"}>
          <Button>Tạo</Button>
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 ">
          <CategoryTable />
        </div>
        <div className="col-span-4 border h-10 rounded-md">
          <ChartPieSeparatorNone />
        </div>
      </div>
      {/* You can add more content or components here */}
    </div>
  );
};

export default page;
