"use client";
import React from "react";
import { ScanButton } from "../shared/buttons/ScanButton";
import { RoutePath } from "@/enums/RoutePath";
import { HomeIcon } from "../icons/sidebar/HomeIcon";
import { TransactionIcon } from "../icons/sidebar/TransactionIcon";
import { usePathname } from "next/navigation";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 shadow-lg p-2 flex justify-around items-center z-10 border-t border-zinc-800">
      <a
        href={RoutePath.Dashboard}
        className="flex flex-col items-center p-2"
      >
        <HomeIcon className={`${pathname == RoutePath.Dashboard ? 'text-white' : 'text-grey-300'}`}/>
        <span className="text-xs mt-1">Home</span>
      </a>
      <ScanButton />
      <a
        href={RoutePath.TransferHistory}
        className="flex flex-col items-center p-2"
      >
        <TransactionIcon className={`${pathname == RoutePath.TransferHistory ? 'text-white' : 'text-grey-300'}`}/>
        <span className="text-xs mt-1">History</span>
      </a>
      <a
        href={RoutePath.Merchants}
        className="flex flex-col items-center p-2"
      >
        <HomeIcon className={`${pathname == RoutePath.Merchants ? 'text-white' : 'text-grey-300'}`} />
        <span className="text-xs mt-1">Discover</span>
      </a>
    </nav>
  );
};
