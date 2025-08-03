"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
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
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>

          <FormCategory />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default page;
