'use client';

import Heading from '@/components/Heading';
import PageLayout from '@/components/PageLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  speaker: z.string().min(1, { message: 'Speaker is required' }),
  imageUrl: z.string().url({ message: 'Invalid URL' }),
  time: z.string().min(1, { message: 'Time is required' }),
  date: z.date().min(new Date(), { message: 'Date is required' }),
});

type WebinarFormValues = z.infer<typeof formSchema>;

const CreateWebinarPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: WebinarFormValues) => {
    console.log(values);
  };

  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      speaker: '',
      //   time: '',
      //   date: new Date(),
      imageUrl: '',
    },
  });

  return (
    <div className='bg-slate-100'>
      <PageLayout>
        <div className='max-w-screen-lg mx-auto pt-[107px]'>
          <div className='flex flex-col space-y-4 p-6'>
            <Heading
              title='Create Webinar'
              description='Create webinar session and invite your attendees'
            />
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-8'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Webinar Title</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Billbord label'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='speaker'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Webinar session speaker</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Speaker name'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image Banner</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={loading}
                              className='resize-none bg-white h-20'
                              placeholder='Webinar description'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='w-300px'>
                    <FormField
                      control={form.control}
                      name='imageUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What&apos;s the webinar about</FormLabel>
                          <FormControl>
                            <UploadButton
                              {...field}
                              endpoint='imageUploader'
                              onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log('Files: ', res);
                                alert('Upload Completed');
                              }}
                              onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type='submit' disabled={loading} className='mr-auto'>
                  Create Webinar
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
