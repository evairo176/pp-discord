"use client";
import React, { useEffect, useState } from "react";
import CreateServerModal from "@/components/elements/create-server-modal";
import EditServerModal from "@/components/elements/edit-server-modal";
import DeleteServerModal from "@/components/elements/delete-server-modal";
import LeaveServerModal from "@/components/elements/leaver-server-modal";
import CreateChannelModal from "@/components/elements/create-channel-modal";
import DeleteChannelModal from "@/components/elements/delete-channel-modal";
import EditChannelModal from "@/components/elements/edit-channel-modal";
import InviteModal from "@/components/elements/invite-modal";
import MemberModal from "@/components/elements/member-modal";
import MessageFileModal from "@/components/elements/message-file-modal";

type Props = {};

const ModalProvider = ({}: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  );
};

export default ModalProvider;
