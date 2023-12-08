"use client";
import React from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@/types";
import ActionTooltip from "@/components/elements/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionInterface {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionInterface) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-muted-foreground">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <Button
            variant={"ghost"}
            className="p-0 h-auto text-muted-foreground"
            onClick={() => onOpen("createChannel", { channelType })}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <Button
            variant={"ghost"}
            className="p-0 h-auto text-muted-foreground"
            onClick={() => onOpen("members", { server })}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
