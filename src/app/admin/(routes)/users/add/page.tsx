"use client";

import PageLayout from "@/components/PageLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { Separator } from "@/components/ui/separator";
import AddUsersHeader from "./components/AddUsersHeader";
import { cn } from "@/lib/utils";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";
import { FileWithPreview } from "@/types";

const WebinarsPage = () => {
  const [file, setFile] = useState<FileWithPreview[] | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const csv = file?.[0]?.preview;
  console.log(users);

  useEffect(() => {
    if (csv) {
      Papa.parse(csv, {
        download: true,
        header: true,
        complete: function (results) {
          setUsers(results.data);
        },
      });
    }
  }, [csv]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      // Do something with the files
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          errors[0]?.message && toast.error(errors[0].message);
        });
        setFile(null);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      csv: [".csv"],
    },
    onDrop,
    maxFiles: 1,
  });
  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="container lg:pt-[107px]">
          <div className="py-6">
            <AddUsersHeader />
            <Separator className="my-6" />

            <div
              {...getRootProps()}
              className={cn(
                "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50"
              )}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop the csv file here, or click to select
                  file
                </p>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default WebinarsPage;
