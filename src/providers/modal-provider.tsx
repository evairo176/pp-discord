"use client";
import CreateChannelModal from "@/components/elements/create-channel-modal";
import CreateServerModal from "@/components/elements/create-server-modal";
import DeleteServerModal from "@/components/elements/delete-server-modal";
import EditServerModal from "@/components/elements/edit-server-modal";
import InviteModal from "@/components/elements/invite-modal";
import LeaveServerModal from "@/components/elements/leaver-server-modal";
import MemberModal from "@/components/elements/member-modal";
import React, { useEffect, useState } from "react";

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
    </>
  );
};

export default ModalProvider;
