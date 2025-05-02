import { Orientation } from "@/lib/types";
import { Settings } from "./settings";
import { WorksheetProvider } from "./worksheet-provider";
import { PrintButton } from "./print-button";
import { WorksheetWrapper } from "./worksheet-wrapper";
import { WORKSHEET_SIZES } from "@/lib/constants";

export function WorksheetSheet<T>({
  orientation,
  children,
  settings,
  defaultData = null,
  instructions,
}: {
  orientation: Orientation;
  children: React.ReactNode;
  settings?: React.ReactNode;
  defaultData?: T | null;
  instructions?: React.ReactNode;
}) {
  return (
    <WorksheetProvider orientation={orientation} defaultData={defaultData}>
      <div className="px-12 py-6 print:p-0 print:bg-transparent">
        <PrintButton />
        {typeof settings !== "undefined" ? (
          <Settings>{settings}</Settings>
        ) : null}
        {instructions ? (
          <div
            className="mb-4 mx-auto p-4 rounded-lg bg-primary/10 text-sm border border-primary/20 print:hidden"
            style={{ width: `${WORKSHEET_SIZES[orientation].width}mm` }}
          >
            {instructions}
          </div>
        ) : null}
        <WorksheetWrapper orientation={orientation}>
          {children}
        </WorksheetWrapper>
      </div>
    </WorksheetProvider>
  );
}
