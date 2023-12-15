"use client";
import React from "react";
import axios from "axios";
import qs from "query-string";
import { chatInputSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import EmojiPicker from "@/components/elements/emoji-picker";

interface ChatInputInterface {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const ChatInput = ({ apiUrl, query, name, type }: ChatInputInterface) => {
  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof chatInputSchema>>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof chatInputSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative p-4 pb-6">
                    <button
                      onClick={() => onOpen("messageFile", { apiUrl, query })}
                      className="absolute top-7 left-8 h-[24px] w-[24px] rounded-full bg-muted-foreground"
                      type="button"
                    >
                      <Plus className="text-primary-foreground" />
                    </button>
                    <Input
                      className="px-14 py-6 bg-muted border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder={`Message ${
                        type === "conversation" ? name : "#" + name
                      }`}
                      {...field}
                      disabled={isLoading}
                    />
                    <div className="absolute top-7 right-8">
                      <EmojiPicker
                        onChange={(emoji: any) =>
                          field.onChange(`${field.value}${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
