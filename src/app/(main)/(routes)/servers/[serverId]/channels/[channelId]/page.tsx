import React from "react";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/elements/chat/chat-header";
import ChatInput from "@/components/elements/chat/chat-input";
import ChatMessages from "@/components/elements/chat/chat-messages";

interface ChannelIdPageInterface {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageInterface) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect(`/`);
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
