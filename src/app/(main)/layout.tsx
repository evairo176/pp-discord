import NavigationSidebar from "@/components/layouts/main/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="hidden md:flex flex-col h-full w-[72px] fixed z-30 inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
