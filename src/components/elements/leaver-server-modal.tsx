"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const LeaveServerModal = (props: Props) => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant={"ghost"} disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant={"destructive"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
