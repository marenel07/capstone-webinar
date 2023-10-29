"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DEPARTMENT_POST } from "@prisma/client";
import { toast } from "sonner";
import axios from "axios";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface DepartmentSwitcherProps extends PopoverTriggerProps {
  department: DEPARTMENT_POST | undefined;
  webinarId: string;
}

export default function DepartmentSwitcher({
  className,
  department,
  webinarId,
}: DepartmentSwitcherProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const onStoreSelect = (department: DEPARTMENT_POST) => {
    setLoading(true);
    setOpen(false);
    toast.promise(
      axios.patch(`/api/webinar/${webinarId}/post`, { department }),
      {
        loading: `Posting to ${department}`,
        success: () => {
          router.refresh();
          return `Posted to ${department}`;
        },
        error: (err) => {
          return toast.error(err.response.data ?? "Something went wrong");
        },
        finally: () => {
          setLoading(false);
        },
      }
    );
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a department"
          className={cn(
            "w-auto justify-between overflow text-ellipsis gap-x-1",
            className
          )}
          disabled={loading}
        >
          {department === DEPARTMENT_POST.UNPOST ? (
            "Unposted"
          ) : (
            <>
              {department ? <span className="mr-1">Posted to</span> : null}
              <p className="text-ellipsis">
                {" "}
                {department || "Select department to post"}
              </p>
            </>
          )}
          <ChevronsUpDown
            size={24}
            className="ml-auto h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {/* <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty> */}
            <CommandGroup heading="Departments">
              {Object.values(DEPARTMENT_POST).map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => onStoreSelect(item)}
                  className="text-sm"
                >
                  {item}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      department === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
