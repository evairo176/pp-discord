import React from "react";
import { Hash } from "lucide-react";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import SocketIndicator from "../socket-indicator";

interface ChatHeaderInterface {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderInterface) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-b bg-background/20 backdrop-blur supports-[backdrop-filter]:bg-background/6">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 mr-2 text-muted-foreground" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-5 w-5 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
