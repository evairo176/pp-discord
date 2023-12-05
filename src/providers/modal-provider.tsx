"use client";
import CreateServerModal from "@/components/elements/create-server-modal";
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

  return <CreateServerModal />;
};

export default ModalProvider;
