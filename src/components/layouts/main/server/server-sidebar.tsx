import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";

interface ServerSidebarInterface {
  serverId: string;
}

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
    </div>
  );
};

export default ServerSidebar;
