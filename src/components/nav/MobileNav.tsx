"use client";
import React from "react";
import { RoutePath } from "@/enums/RoutePath";
import { HomeIcon } from "../icons/sidebar/HomeIcon";
import { TransactionIcon } from "../icons/sidebar/TransactionIcon";
import { usePathname } from "next/navigation";
import { SearchIcon } from "../icons/sidebar/SearchIcon";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItemClass =
    "flex flex-col items-center justify-center text-xs gap-1 flex-1";

  const getIconClass = (route: string) =>
    pathname === route ? "text-white" : "text-zinc-400";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 flex justify-between items-center z-10">
      <a href={RoutePath.Dashboard} className={navItemClass}>
        <HomeIcon className={`h-5 w-5 ${getIconClass(RoutePath.Dashboard)}`} />
        <span>Home</span>
      </a>

      <a href={RoutePath.Discover} className={navItemClass}>
        <SearchIcon className={`h-5 w-5 ${getIconClass(RoutePath.Discover)}`} />
        <span>Discover</span>
      </a>
      
      <a href={RoutePath.TransferHistory} className={navItemClass}>
        <TransactionIcon
          className={`h-5 w-5 ${getIconClass(RoutePath.TransferHistory)}`}
        />
        <span>History</span>
      </a>
    </nav>
  );
};
