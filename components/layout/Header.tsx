import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { CircleDollarSignIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex py-2 bg-sidebar justify-between px-4  shadow sticky top-0 z-50">
      <SidebarTrigger />

      <div className="text-md font-semibold text-white px-4 py-1 rounded-sm bg-green-500 flex gap-2 items-center">
        <CircleDollarSignIcon size={16} />
        <span>1,000,000đ</span>
      </div>
    </div>
  );
};

export default Header;
