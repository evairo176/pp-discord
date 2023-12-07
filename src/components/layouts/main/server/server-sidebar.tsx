import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

interface ServerSidebarInterface {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: ServerSidebarInterface) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (members) => members.profileId !== profile.id
  );

  const role = server?.members.find(
    (members) => members.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full w-full bg-card/20 text-card-foreground shadow">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => {
                  return {
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role],
                  };
                }),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
