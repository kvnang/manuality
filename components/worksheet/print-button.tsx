"use client";

import { PrinterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useWorksheet } from "./worksheet-provider";

export function PrintButton() {
  const { print } = useWorksheet();

  const handlePrint = () => {
    print();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="fixed top-2 right-16 size-12 z-10 print:hidden"
      onClick={handlePrint}
    >
      <PrinterIcon className="size-5" />
    </Button>
  );
}
