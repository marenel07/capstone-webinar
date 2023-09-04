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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { CheckCircle, X } from 'lucide-react';

import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';
import type { FileWithPreview } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { cn, isArrayOfFile } from '@/lib/utils';
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  number: z.number().min(1, { message: 'Number is required' }),
  age: z.number().min(1, { message: 'Age is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  school: z.string().min(1, { message: 'Name of school/company is required' }),
});

type WebinarFormValues = z.infer<typeof formSchema>;

const CreateWebinarPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const [isPending, startTransition] = useTransition();

  const preview = files?.map((file) => (
    <Image
      key={file.preview}
      src={file.preview}
      alt='preview'
      width={472}
      height={250}
      className='md:aspect-[2.4/1] object-cover object-center'
    />
  ));

  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      number: null as any,
      age: null as any,
      address: '',
      occupation: '',
      school: '',
    },
  });

  const [hasImage, setHasImage] = useState(false);

  const onSubmit = async (values: WebinarFormValues) => {
    startTransition(async () => {
      try {
        setLoading(true);
        console.log(values);

        form.reset();
        setFiles(null);
        setHasImage(false);
        router.refresh();
        router.push('/admin/my-webinars');
        toast({
          description: (
            <div className='flex gap-2 items-center'>
              <CheckCircle className='w-6 h-6 text-green-600' />
              <span>Webinar created successfully</span>
            </div>
          ),
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          description: error.response.data,
        });
      } finally {
        setLoading(false);
      }
    });
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
                    name='school'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name of school/company (write in full)
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
