"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

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
import { WEBINAR_STATUS } from "@prisma/client";
import { toast } from "sonner";
import axios from "axios";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StatusSwitcherProps extends PopoverTriggerProps {
  status: WEBINAR_STATUS | undefined;
  webinarId: string;
}

export default function StatusSwitcher({
  className,
  status,
  webinarId,
}: StatusSwitcherProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onStoreSelect = (status: WEBINAR_STATUS) => {
    setLoading(true);
    setOpen(false);
    toast.promise(axios.patch(`/api/webinar/${webinarId}/status`, { status }), {
      loading: `Updating to ${status}`,
      success: () => {
        router.refresh();
        return `Updated to ${status}`;
      },
      error: (err) => {
        return toast.error(err.response.data ?? "Something went wrong");
      },
      finally: () => {
        setLoading(false);
      },
    });
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a status"
          className={cn(
            "w-auto justify-between overflow text-ellipsis gap-x-1",
            className
          )}
          disabled={loading}
        >
          <p className="text-ellipsis"> {status || "Update status"}</p>

          <ChevronsUpDown
            size={24}
            className="ml-auto h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Status">
              {Object.values(WEBINAR_STATUS).map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => onStoreSelect(item)}
                  className="text-sm"
                >
                  {item}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      status === item ? "opacity-100" : "opacity-0"
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
