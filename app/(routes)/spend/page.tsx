import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon } from "lucide-react";
import React from "react";
import { DialogDemo } from "./components/FormCreate";
import ListSpend from "./components/ListSpend";

const page = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xl">Danh sách</h4>

        <DialogDemo />
      </div>

      <ListSpend />
    </div>
  );
};

export default page;
