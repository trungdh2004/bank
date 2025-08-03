"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";
import FormCategory from "../../../components/FormCategory";

const page = () => {
  const router = useRouter();
  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục</DialogTitle>
        </DialogHeader>
        <FormCategory />
      </DialogContent>
    </Dialog>
  );
};

export default page;
