"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import { vi } from "react-day-picker/locale";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  total: z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date(),
  description: z.string().optional(),
  color: z.string().optional(),
});

export function DialogDemo() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total: 0,
      date: new Date(),
      description: "",
      color: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const month = values.date?.getMonth() + 1 || new Date().getMonth() + 1;
      const year = values.date?.getFullYear() || new Date().getFullYear();

      const response = await axios.post("/api/spend", {
        ...values,
        month,
        year,
      });
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["spend", "list"] });
      setOpen(false);
    } catch (error) {
      console.error("Error creating spend:", error);
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
                    name="total"
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
                              disabled={(date) =>
                                date <= new Date() ||
                                date < new Date("1900-01-01")
                              }
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
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Màu</FormLabel>
                        <FormControl>
                          <Input
                            type="color"
                            placeholder="Màu"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
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
            </DialogContent>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
