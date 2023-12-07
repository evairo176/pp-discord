"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ServerSearchInterface {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchInterface) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", down);
    return document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="group w-full px-2 py-2 flex items-center gap-x-2 justify-start"
        variant={"ghost"}
      >
        <Search className="mr-1 w-4 h-4 text-muted-foreground" />
        <p className="font-semibold text-sm text-muted-foreground ">search</p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted-foreground/30 px-1.5 
        font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data?.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map((row) => {
                  return (
                    <CommandItem
                      key={row.id}
                      onSelect={() => onClick({ id: row.id, type })}
                    >
                      {row.icon} <span>{row.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
