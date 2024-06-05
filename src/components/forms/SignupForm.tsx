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

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "نام حداقل باید دارای 2 کاراکتر باشد",
  }),
  lastname: z.string().min(2, {
    message: "نام خانوادگی حداقل باید دارای 2 کاراکتر باشد",
  }),
  username: z.string().min(2, {
    message: "نام کاربری حداقل باید دارای 2 کاراکتر باشد",
  }),
  password: z.string().min(8, {
    message: "پسورد حداقل 8 حرفی است"
  })
})

export function SignupForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstname: "",
        lastname: "",
        username: "",
        password: ""
      },
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
          name="firstname"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              {/* <FormDescription>
                این نام برای نمایش عموم گذاشته می‌شود
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
              </FormControl>
              {/* <FormDescription>
                این نام برای نمایش عموم گذاشته می‌شود
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>نام کاربری</FormLabel>
              <FormControl>
                <Input placeholder="نام کاربری دلخواه خود را وارد کنید" {...field} />
              </FormControl>
              {/* <FormDescription>
                این نام برای نمایش عموم گذاشته می‌شود
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>رمز عبور</FormLabel>
              <FormControl>
                <Input placeholder="رمز عبور دلخواه خود را وارد کنید" {...field} dir="auto"/>
              </FormControl>
              {/* <FormDescription>
                این نام برای نمایش عموم گذاشته می‌شود
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="px-10">ثبت نام</Button>
        </div>
        
      </form>
    </Form>
  )
}
