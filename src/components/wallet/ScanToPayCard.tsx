"use client";
import { ScanToPaySection } from "../QrScanner";

export default function ScanToPayCard() {
  return (
    <div className="flex flex-col gap-4">
      <ScanToPaySection className="w-fit"/>
    </div>
  );
}
