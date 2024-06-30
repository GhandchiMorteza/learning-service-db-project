import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters long',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters long',
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://109.120.135.54:3005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);

        throw new Error(data.error);
      }

      const data = await response.json();
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/');
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setErrorMessage(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="-8 text-left">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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
                <Input
                  placeholder="Enter your password"
                  {...field}
                  dir="auto"
                />
              </FormControl>
              <FormDescription>
                <Link to="/signup">
                  <p>Do you want to singup instead?</p>
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center">
          <Button type="submit" className="px-10">
            ورود
          </Button>
        </div>
      </form>
    </Form>
  );
}
