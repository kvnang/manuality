"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings2Icon } from "lucide-react";
import { useWorksheet } from "./worksheet-provider";

export function Settings({ children }: { children: React.ReactNode }) {
  const { settingsOpen, setSettingsOpen } = useWorksheet();
  return (
    <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
      <SheetTrigger asChild className="print:hidden">
        <Button
          size="icon"
          className="fixed top-2 right-2 size-12 z-10"
          variant="ghost"
        >
          <Settings2Icon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="print:hidden">{children}</SheetContent>
    </Sheet>
  );
}
