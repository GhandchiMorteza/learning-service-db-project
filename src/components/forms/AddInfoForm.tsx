import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MultipleSelector, { Option } from "../ui/MultipleSelector"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  sex: z
    .string({
      required_error: "لطفا جنسیت خود را انتخاب کنید",
    }),
  address: z.string().min(5, {
    message: "آدرس حداقل باید دارای 5 کاراکتر باشد",
  }),
  birthdate: z.string().min(5, {
    message: "تاریخ تولد حداقل باید دارای 5 کاراکتر باشد",
  }),
  description: z.string().min(5, {
    message: "تاریخ تولد حداقل باید دارای 5 کاراکتر باشد",
  }),
  number: z.string().min(11, {
    message: "تاریخ تولد حداقل باید دارای 11 کاراکتر باشد",
  }),
  interests:  z.array(optionSchema).min(1),
})

const OPTIONS: Option[] = [
  { label: 'نکست', value: 'نکست' },
  { label: 'ریکت', value: 'ریکت' },
  { label: 'ریمیکس', value: 'ریمیکس' },
  { label: 'ویت', value: 'ویت' },
  { label: 'ناکست', value: 'ناکست' },
  { label: 'ویو', value: 'ویو' },
];

export function AddInfoForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="-8">
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem dir="rtl" className="mb-3">
              <FormLabel>جنسیت</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl dir="rtl">
                  <SelectTrigger>
                    <SelectValue placeholder="جنسیت خود را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent dir="rtl">
                  <SelectItem value="مرد">مرد</SelectItem>
                  <SelectItem value="زن">زن</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>    
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>آدرس محل سکونت</FormLabel>
              <FormControl>
                <Input placeholder="آدرس محل سکونت خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>
                <Input placeholder="تاریخ تولد خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>درباره</FormLabel>
              <FormControl>
                <Input placeholder="درباره خود بنویسید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>شماره تلفن</FormLabel>
              <FormControl>
                <Input placeholder="شماره تلفن خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>علاقه مندی ها</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  defaultOptions={OPTIONS}
                  placeholder="از بین گزینه ها انتخاب کنید"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      نتیجه ای پیدا نشد
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="px-10">ثبت اطلاعات</Button>
        </div>
        
      </form>
    </Form>
  )
}


