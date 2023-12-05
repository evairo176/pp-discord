"use client";
import ActionTooltip from "@/components/elements/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const NavigationAction = (props: Props) => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a Server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
        group-hover:rounded-[16px] transition-all 
        overflow-hidden items-center justify-center bg-muted-foreground group-hover:bg-muted-foreground/40"
          >
            <Plus className="text-muted group-hover:text-muted/80" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
