"use client";
import React from "react";
import qs from "query-string";
import ActionTooltip from "../action-tooltip";
import { Button } from "@/components/ui/button";
import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {};

const ChatVideoButton = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");
  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  // click button
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };
  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <Button
        variant={"ghost"}
        onClick={onClick}
        className="hover:opacity-70 transition mr-4"
      >
        <Icon className="h-6 w-6 text-muted-foreground" />
      </Button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
