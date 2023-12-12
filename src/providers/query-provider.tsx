"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryProviderInterface = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: QueryProviderInterface) => {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
