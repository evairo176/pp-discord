"use client";
import React from "react";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

interface EmojiPickerInterface {
  onChange: (value: String) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerInterface) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-muted-foreground hover:text-primary transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => {
            onChange(emoji.native);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
