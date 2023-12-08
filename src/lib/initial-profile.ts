import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./prisma";
import { generateUsername } from "@/helper/generate-random-name";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }
  let name = "";
  if (!user.firstName && !user.lastName) {
    name = generateUsername(user.emailAddresses[0].emailAddress);
  } else {
    name = `${user.firstName} ${user.lastName}`;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: name,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
