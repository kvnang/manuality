"use client";

import { Orientation } from "@/lib/types";
import { useWorksheet } from "./worksheet-provider";
import { lexend } from "@/styles/fonts";
import { WORKSHEET_SIZES } from "@/lib/constants";

export function WorksheetWrapper({
  orientation,
  children,
}: {
  orientation: Orientation;
  children: React.ReactNode;
}) {
  const { ref } = useWorksheet();
  return (
    <section
      className="m-0 overflow-hidden relative bg-white border shadow-md print:shadow-none break-after-page print:border-0 print:absolute print:inset-0 p-[10mm] print:!p-[0mm]"
      style={{
        margin: "0 auto",
        width: `${WORKSHEET_SIZES[orientation].width}mm`,
        height: `${WORKSHEET_SIZES[orientation].height}mm`,
        // For HTML->Canvas styling
        ...lexend.style,
      }}
    >
      <div ref={ref} className="flex flex-col size-full items-start">
        <div className="flex flex-col gap-6 size-full items-start">
          {children}
        </div>
      </div>
    </section>
  );
}
