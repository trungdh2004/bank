"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function FormCategory() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchInit = async () => {
    setLoading(true);
    // Simulate fetching initial data
    try {
      const { data } = await axios.get(`/api/category/${id}`);
      form.reset(data.data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchInit();
    }
  }, [id]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/category/${id}`, values);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await axios.post("/api/category", values);
        toast.success("Tạo danh mục thành công");
      }
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      router.back();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="danh mục" {...field} disabled={loading} />
              </FormControl>
              <FormDescription>Đề nghị nhập tên</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Lưu"}
        </Button>
      </form>
    </Form>
  );
}

export default FormCategory;
