"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/elements/user-avatar";

interface ServerMemberInterface {
  member: Member & {
    profile: Profile;
  };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 text-indigo-500 ml-2" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 text-rose-500 ml-2" />,
};

const ServerMember = ({ member, server }: ServerMemberInterface) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };
  return (
    <Button
      onClick={onClick}
      variant={params?.memberId === member.id ? "secondary" : "ghost"}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full mb-1 justify-start transition"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-4 w-4 md:h-8 md:w-8"
      />

      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-muted-foreground  transition",
          params?.memberId === member.id && "text-primary"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </Button>
  );
};

export default ServerMember;
