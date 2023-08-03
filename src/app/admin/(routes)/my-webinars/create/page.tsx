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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { X } from 'lucide-react';

import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';
import type { FileWithPreview } from '@/types';
import { ImageUpload } from '@/components/ImageUpload';
import { toast } from '@/components/ui/use-toast';
import { isArrayOfFile } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  speaker: z.string().min(1, { message: 'Speaker is required' }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, 'Must be an array of File')
    .default(null),
  // time: z.string().min(1, { message: 'Time is required' }),
  // date: z.date().min(new Date(), { message: 'Date is required' }),
});

type WebinarFormValues = z.infer<typeof formSchema>;

const CreateWebinarPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { isUploading, startUpload } = useUploadThing('imageUploader');
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
      title: '',
      description: '',
      speaker: '',
      //   time: '',
      //   date: new Date(),
      images: [],
    },
  });

  const onSubmit = async (values: WebinarFormValues) => {
    const imageUrl = isArrayOfFile(values.images)
      ? await startUpload(values.images).then((res) => {
          const formattedImages = res?.map((image) => ({
            id: image.fileKey,
            name: image.fileKey.split('_')[1] ?? image.fileKey,
            url: image.fileUrl,
          }));
          return formattedImages?.[0]?.url
            ? (formattedImages[0].url as string)
            : null;
        })
      : null;

    console.log(imageUrl);
  };

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
                          <FormLabel>What&apos;s the webinar about</FormLabel>
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
                    <FormItem>
                      <FormLabel>Image banner</FormLabel>
                      <FormControl>
                        <ImageUpload
                          setValue={form.setValue}
                          name='images'
                          files={files}
                          setFiles={setFiles}
                          isUploading={isUploading}
                          isPending={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                  <div className='w-full md:aspect-[2.4/1] bg-cover relative group'>
                    {preview && (
                      <div className='col-span-2'>
                        <div className='flex flex-col space-y-2'>
                          <div className=' md:aspect-[2.4/1] bg-cover mt-8'>
                            {preview}
                          </div>
                          <div className='absolute top-8 right-4 opacity-0 transition-all group-hover:opacity-100'>
                            <Button
                              variant='secondary'
                              size='icon'
                              className='text-sm text-slate-500 rounded-full'
                              onClick={() => setFiles(null)}
                            >
                              <X className='h-5 w-5' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button type='submit' disabled={loading} className='mr-auto'>
                    Create Webinar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CreateWebinarPage;
