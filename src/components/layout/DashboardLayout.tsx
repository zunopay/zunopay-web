"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { Text } from "@/components/ui/Text";
import { User } from "@/models/user";
import { LogoutButton } from "../shared/buttons/LogoutButton";
import { RewardPointSection } from "../shared/RewardPointSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "../nav/MobileNav";
import { CustomisableLogo } from "../icons/platform/CustomisableLogo";
import { usePathname } from "next/navigation";
import { RoutePath } from "@/enums/RoutePath";

type Props = React.PropsWithChildren & {
  user: User;
  mainClassName?: string;
  showFooter?: boolean;
  activePath?: string;
};

export const DashboardLayout: React.FC<Props> = ({
  user,
  children,
  mainClassName,
  activePath,
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const pathname = usePathname();

  const isDashboardHome = pathname == RoutePath.Dashboard;
  const isItemsEnd = !isMobile && !isDashboardHome;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen h-full w-full">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            !sidebarOpen ? "w-0 opacity-0" : "opacity-100"
          )}
        >
          <DashboardSidebar activePath={activePath} me={user} />
        </div>

        <main
          className={cn(
            "flex-1 flex flex-col min-h-screen h-full w-full bg-gradient-to-b from-zinc-950 to-zinc-900 text-white",
            mainClassName
          )}
        >
          <header
            className={cn(
              "flex items-center p-4 justify-between",
              isMobile && "sticky top-0 z-10 opacity-90 bg-zinc-950",
              isItemsEnd && "justify-end"
            )}
          >
            {isMobile ? (
              <SidebarTrigger className="fixed top-4 left-2 z-50 bg-zinc-950 lg:hidden text-white px-3 py-2 rounded-md" />
            ) : isDashboardHome ? (
              <Text as="h1" styleVariant="secondary-heading">
                Welcome, {user.username}
              </Text>
            ) : null}

            <div className="flex gap-3 items-center justify-end w-full">
              <RewardPointSection />
              <LogoutButton />
            </div>
          </header>

          <div
            className={`flex-1 ${
              isMobile ? "p-3 gap-4" : "gap-8 p-4 md:p-6 lg:p-8"
            },`}
          >
            {children}
          </div>

          {isMobile && (
            <div className="mt-20">
              <MobileNav />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};
