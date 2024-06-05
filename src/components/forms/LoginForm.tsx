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
  username: z.string().min(2, {
    message: "نام کاربری حداقل باید دارای 2 کاراکتر باشد",
  }),
  password: z.string().min(8, {
    message: "پسورد حداقل 8 حرفی است"
  })
})

export function LoginForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
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
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>نام کاربری</FormLabel>
              <FormControl>
                <Input placeholder="نام کاربری خود را وارد کنید" {...field} />
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
                <Input placeholder="رمز عبور خود را وارد کنید" {...field} dir="auto"/>
              </FormControl>
              {/* <FormDescription>
                این نام برای نمایش عموم گذاشته می‌شود
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="px-10">ورود</Button>
        </div>
        
      </form>
    </Form>
  )
}
