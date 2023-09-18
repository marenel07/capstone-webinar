'use client';

import Heading from '@/components/Heading';
import PageLayout from '@/components/PageLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import qs from 'query-string';

import { CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  number: z.string().min(1, { message: 'Number is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  company: z.string().min(1, { message: 'Name of school/company is required' }),
});

type WebinarFormValues = z.infer<typeof formSchema>;

const CreateWebinarPage = ({ params }: { params: { webinarId: string } }) => {
  const router = useRouter();

  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
      age: '',
      address: '',
      occupation: '',
      company: '',
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: WebinarFormValues) => {
    try {
      console.log();

      const url = qs.stringifyUrl({
        url: `/api/webinar/${params.webinarId}/registration`,
        query: {
          webinarId: params.webinarId,
        },
      });

      await axios.patch(url, {
        ...values,
        number: parseInt(values.number),
        age: parseInt(values.age),
      });

      form.reset();
      router.refresh();
      router.push('/');
      toast({
        description: (
          <div className='flex gap-2 items-center'>
            <CheckCircle className='w-6 h-6 text-green-600' />
            <span>Webinar registration successful</span>
          </div>
        ),
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.response.data,
      });
      console.log(error.response.data);
    }
  };

  return (
    <div className='bg-slate-100 min-h-screen'>
      <PageLayout>
        <div className='mx-auto pt-[107px]'>
          <div className='flex flex-col space-y-4 p-6'>
            <Heading
              title='Register Webinar'
              description='Register to this webinar to get the latest information about the topic.'
            />
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name (Surname, Firstname, MI</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='e.g Dela Cruz, Juan, M'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='example@gmail.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='number'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='09XXXXXXXXX'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='age'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='18'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Address'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='occupation'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Occupation (Write &apos;student&apos; if still
                          studying)
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='student'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='company'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name of school/company (write in full)
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Sorsogon State University'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type='submit'
                  disabled={loading}
                  className='mr-auto mt-8'
                >
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CreateWebinarPage;
