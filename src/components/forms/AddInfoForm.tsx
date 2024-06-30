import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  sex: z.string({
    required_error: 'Please select your gender',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters long',
  }),
  birthdate: z.string().min(5, {
    message: 'Birthdate must be at least 5 characters long',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters long',
  }),
  number: z.string().min(11, {
    message: 'Number must be at least 11 characters long',
  }),
  interests: z.array(optionSchema).min(1),
});

export function AddInfoForm() {
  // as { data: Video }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="-8 text-left">
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Sex</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
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
              <FormLabel>Residential Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your residential address"
                  {...field}
                />
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
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input placeholder="Enter your birth date" {...field} />
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
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input placeholder="Write about yourself" {...field} />
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>interests</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your interests" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="next">Next</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="px-10">
            Submit Information
          </Button>
        </div>
      </form>
    </Form>
  );
}
