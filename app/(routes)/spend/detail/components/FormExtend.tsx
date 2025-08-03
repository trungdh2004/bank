"use client";
import SelectPagingComponent from "@/components/common/SelectPagination";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { vi } from "react-day-picker/locale";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  amount: z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date(),
  description: z.string().optional(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  bank: z.object({
    id: z.string(),
    name: z.string(),
  }),
  isAdd: z.boolean(),
});

export function DialogDemo() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: "",
      isAdd: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/expense", {
        amount: values.amount,
        date: values.date,
        description: values.description,
        category: values.category,
        bank: values.bank,
        spendMonthId: id, // Replace with actual spend month ID
        isAdd: values.isAdd,
      });
      toast.success("Tạo thành công");
      setOpen(false);
    } catch (error) {
      console.error("Error creating spend:", error);
      toast.error("Có lỗi xảy ra khi tạo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        Tạo mới
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Spend</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tổng tiền</FormLabel>
                        <FormControl>
                          <NumericFormat
                            placeholder="Tiền"
                            value={field.value}
                            allowLeadingZeros
                            thousandSeparator=","
                            disabled={loading}
                            autoFocus
                            className={cn(
                              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            )}
                            onValueChange={(val) => {
                              field.onChange(val.floatValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field?.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              captionLayout="dropdown"
                              locale={vi}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <SelectPagingComponent
                            url="/api/category"
                            value={field.value}
                            onChange={(val) => {
                              console.log("Selected category:", val);
                              field.onChange(val);
                            }}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank</FormLabel>
                        <FormControl>
                          <SelectPagingComponent
                            url="/api/bank"
                            value={field.value}
                            onChange={(val) => {
                              console.log("Selected category:", val);
                              field.onChange(val);
                            }}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Màu"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isAdd"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Tiền cộng
                        </FormLabel>
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
            </DialogContent>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
