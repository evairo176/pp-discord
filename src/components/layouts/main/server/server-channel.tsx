"use client";
import React from "react";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ActionTooltip from "@/components/elements/action-tooltip";
import { cn } from "@/lib/utils";
import { modalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelInterface {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: (
    <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground mr-1" />
  ),
  [ChannelType.AUDIO]: (
    <Mic className="h-4 w-4 flex-shrink-0 text-muted-foreground mr-1" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="h-4 w-4 flex-shrink-0 text-muted-foreground mr-1" />
  ),
};

const ServerChannel = ({ channel, server, role }: ServerChannelInterface) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: modalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <Button
      onClick={onClick}
      variant={params?.channelId === channel.id ? "secondary" : "ghost"}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full mb-1 justify-start transition"
      )}
    >
      {icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-muted-foreground  transition",
          params?.channelId === channel.id && "text-primary"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "editChannel")}
              className="hidden group-hover:block w-4 h-4 text-muted-foreground"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-rose-500"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-muted-foreground" />
      )}
    </Button>
  );
};

export default ServerChannel;
