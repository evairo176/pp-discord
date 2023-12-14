"use client";
import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/providers/socket-provider";

interface ChatQueryInterface {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryInterface) => {
  const { isConnected } = useSocket();

  const fetchMessages = async (pageValue: any) => {
    const { pageParams } = pageValue;
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParams,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);

    return res.json();
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: !isConnected ? false : 1000,
      initialPageParam: 1, // Or some other value if there's a better one
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
