import { Hash } from "lucide-react";
import React from "react";

interface ChatWelcomeInterface {
  type: "channel" | "conversation";
  name: string;
}

const ChatWelcome = ({ type, name }: ChatWelcomeInterface) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full flex items-center justify-center bg-muted ">
          <Hash className="h-12 w-12" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold ">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-sm ">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
