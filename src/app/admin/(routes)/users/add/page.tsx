"use client";

import PageLayout from "@/components/PageLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AddUsersHeader from "./components/AddUsersHeader";
import { cn } from "@/lib/utils";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";
import { FileWithPreview } from "@/types";
import UserAddTable from "./components/UserAddTable";
import axios from "axios";
import { useRouter } from "next/navigation";

const WebinarsPage = () => {
  const [file, setFile] = useState<FileWithPreview[] | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const csv = file?.[0]?.preview;

  const router = useRouter();

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

  const onSubmit = async () => {
    try {
      setLoading(true);
      const usersWithName = users.map((user) => {
        return {
          ...user,
          name: `${user.firstName} ${user.lastName}`,
        };
      });

      const data = usersWithName.slice(0, -1);

      await axios.post("/api/register", { data });
      toast.success("Users added successfully");
      router.refresh();
      setUsers([]);
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="container lg:pt-[107px]">
          <div className="py-6">
            <AddUsersHeader loading={loading} />
            <Separator className="my-6" />

            {users.length > 0 ? (
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center justify-end gap-x-3">
                  <Button onClick={onSubmit} disabled={loading}>
                    Add users
                  </Button>
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={() => setUsers([])}
                  >
                    Clear
                  </Button>
                </div>
                <UserAddTable users={users} />
              </div>
            ) : (
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
                    Drag &apos;n&apos; drop the csv file here, or click to
                    select file
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default WebinarsPage;
