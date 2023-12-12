"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageFileSchema } from "@/lib/form-schema";
import { z } from "zod";
import FileUpload from "./file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import qs from "query-string";

type Props = {};

const MessageFileModal = (props: Props) => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();
  const isModalOpen = isOpen && type === "messageFile";
  const { apiUrl, query } = data;

  const form = useForm<z.infer<typeof messageFileSchema>>({
    resolver: zodResolver(messageFileSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof messageFileSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      handleClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center">
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right">
              <Button disabled={isLoading} type="submit">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
