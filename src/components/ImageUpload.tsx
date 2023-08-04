'use client';

import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  FieldValues,
  Path,
  UseFormSetValue,
  PathValue,
} from 'react-hook-form';
import type { FileWithPreview } from '@/types';
import { toast } from './ui/use-toast';
import {
  useDropzone,
  type FileWithPath,
  type FileRejection,
} from 'react-dropzone';
import { useCallback } from 'react';
import { set } from 'date-fns';

interface ImageUploadProps<TFieldValues extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  name: Path<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  isUploading?: boolean;
  isPending?: boolean;
  setHasImage?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImageUpload<TFieldValues extends FieldValues>({
  name,
  setValue,
  setFiles,
  isUploading,
  isPending,
  setHasImage,
}: ImageUploadProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      setValue(
        name,
        acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>,
        {
          shouldValidate: true,
        }
      );

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      setHasImage && setHasImage(true);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === 'file-too-large') {
            toast({
              variant: 'destructive',
              title: 'File too large',
              description: `File is too large. Max size is 8MB. Your file is ${Math.round(
                rejectedFiles[0].file.size / 1024 / 1024
              )}MB`,
            });
            return;
          }
          errors[0]?.message &&
            toast({ variant: 'destructive', description: errors[0].message });
        });
        setFiles(null);
      }
    },

    [setFiles, setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isDragActive && 'border-muted-foreground/50',
        isPending && 'pointer-events-none opacity-60'
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className='group grid w-full place-items-center gap-1 sm:px-10'>
          <UploadCloud
            className='h-9 w-9 animate-pulse text-muted-foreground'
            aria-hidden='true'
          />
        </div>
      ) : isDragActive ? (
        <div className='grid place-items-center gap-2 text-muted-foreground sm:px-5'>
          <UploadCloud
            className={cn('h-8 w-8', isDragActive && 'animate-bounce')}
            aria-hidden='true'
          />
          <p className='text-base font-medium'>Drop the file here</p>
        </div>
      ) : (
        <div className='grid place-items-center gap-1 sm:px-5'>
          <UploadCloud
            className='h-8 w-8 text-muted-foreground'
            aria-hidden='true'
          />
          <p className='mt-2 text-base font-medium text-muted-foreground'>
            Drag {`'n'`} drop file here, or click to select file
          </p>
          <p className='text-sm text-slate-500'>
            Please upload file with size less than 8MB
          </p>
        </div>
      )}
    </div>
  );
}
