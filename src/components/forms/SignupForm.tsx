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
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  })
})

export function SignupForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)

    try {
      const response = await fetch('http://localhost:3005/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        
        throw new Error(data.error);
      }

      const data = await response.json();
      console.log(data);

      // localStorage.setItem('userData', JSON.stringify(data));

      const response2 = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response2.ok) {
        const data = await response2.json();
        console.log(data);
      
        throw new Error(data.error);
      }

      const data2 = await response2.json()
      localStorage.setItem('userData', JSON.stringify(data2));
      console.log(data2)
      navigate('/');

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setErrorMessage(error.message);
    }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="-8">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your desired username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your desired password" {...field} dir="auto"/>
              </FormControl>
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
