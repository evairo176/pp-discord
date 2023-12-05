import { ToggleThemes } from "@/components/elements/toggle-themes";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignIn />
    </div>
  );
}
