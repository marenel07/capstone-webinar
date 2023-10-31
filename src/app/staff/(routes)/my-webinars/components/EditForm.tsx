"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CalendarIcon, CheckCircle, X } from "lucide-react";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import type { FileWithPreview } from "@/types";
import { ImageUpload } from "@/components/ImageUpload";
import { toast } from "@/components/ui/use-toast";
import { cn, isArrayOfFile } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { Webinar } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  speaker: z.string().min(1, { message: "Speaker is required" }),
  images: z.unknown().refine((val) => {
    if (!Array.isArray(val)) return false;
    if (val.some((file) => !(file instanceof File))) return false;
    return true;
  }, "Must be an array of File"),
  time: z.string().min(1, { message: "Time is required" }),
  date: z.date().min(new Date(), { message: "Date is required" }),
});

type WebinarFormValues = z.infer<typeof formSchema>;

interface EditWebinarFormProps {
  data: Webinar | null | undefined;
}

const EditWebinarForm = ({ data }: EditWebinarFormProps) => {
  const router = useRouter();
  const params = useParams();

  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { isUploading, startUpload } = useUploadThing("imageUploader");

  let preview =
    data?.imageUrl && !files ? (
      <Image
        src={data?.imageUrl}
        alt="preview"
        fill
        loading="lazy"
        className="md:aspect-[2.4/1] object-cover object-center"
      />
    ) : (
      files?.map((file) => (
        <Image
          key={file.preview}
          src={file.preview}
          alt="preview"
          fill
          sizes="100%"
          className="md:aspect-[2.4/1] object-cover object-center"
        />
      ))
    );

  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title,
      description: data?.description,
      speaker: data?.speaker,
      time: data?.time,
      date: data?.date,
      images: [],
    },
  });

  const [hasImage, setHasImage] = useState(false);
  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: WebinarFormValues) => {
    try {
      if (values.images) {
        setHasImage(true);
      }

      const imageUrl = isArrayOfFile(values.images)
        ? await startUpload(values.images).then((res) => {
            const formattedImages = res?.map((image) => ({
              id: image.fileKey,
              name: image.fileKey.split("_")[1] ?? image.fileKey,
              url: image.fileUrl,
            }));
            return formattedImages?.[0]?.url
              ? (formattedImages[0].url as string)
              : null;
          })
        : null;

      if (hasImage) {
        await axios.patch(`/api/webinar/${params.webinarId}`, {
          ...values,
          imageUrl,
        });
      }

      if (!hasImage) {
        await axios.patch(`/api/webinar/${params.webinarId}`, {
          ...values,
          imageUrl: data?.imageUrl,
        });
      }

      form.reset();
      setFiles(null);
      setHasImage(false);
      router.refresh();
      router.push("/admin/my-webinars");
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Webinar updated successfully</span>
          </div>
        ),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data,
      });
    }
  };

  return (
    <div className="max-w-[1440px] w-full mt-4">
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:grid md:grid-cols-2 gap-8 m-0 flex flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webinar Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Webinar title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="speaker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webinar session speaker</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Speaker name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What&apos;s the webinar about</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          className="resize-none bg-white h-20"
                          placeholder="Webinar description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-300px">
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <ImageUpload
                      setValue={form.setValue}
                      name="images"
                      setFiles={setFiles}
                      isUploading={isUploading}
                      isPending={loading}
                      setHasImage={setHasImage}
                    />
                  </FormControl>
                </FormItem>
              </div>

              <div className="w-full aspect-video bg-cover relative group">
                {preview && (
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-2">
                      <div className=" md:aspect-[2.4/1] bg-cover mt-8">
                        {preview}
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 transition-all group-hover:opacity-100">
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="text-sm text-slate-500 rounded-full"
                          onClick={() => {
                            setFiles(null);
                            setHasImage(false);
                          }}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webinar session speaker</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[240px] cursor-pointer hover:bg-primary-foreground bg-none"
                        type="time"
                        disabled={loading}
                        placeholder="Time of webinar session"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-[10px] ">
                    <FormLabel>Date of Webinar</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={loading}
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="mr-auto mt-8">
              Save update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditWebinarForm;
