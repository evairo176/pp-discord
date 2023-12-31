import InitialModal from "@/components/elements/initial-modal";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const SetupPage = async (props: Props) => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div>
      <InitialModal />
    </div>
  );
};

export default SetupPage;
