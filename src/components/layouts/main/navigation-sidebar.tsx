import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ToggleThemes } from "@/components/elements/toggle-themes";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const NavigationSidebar = async (props: Props) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="border-r bg-card text-card-foreground space-y-4 flex flex-col items-center h-full py-3">
      <NavigationAction />
      <Separator className="h-[2px] w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers?.map((row, key) => {
          return (
            <div key={key} className="mb-4">
              <NavigationItem
                id={row.id}
                imageUrl={row.imageUrl}
                name={row.name}
              />
            </div>
          );
        })}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ToggleThemes />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
