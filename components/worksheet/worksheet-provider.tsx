"use client";

import { Orientation } from "@/lib/types";
import { usePDF } from "react-to-pdf";
import * as React from "react";

interface WorksheetContextType<T> {
  ref: React.RefObject<HTMLDivElement | null>;
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  settingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  print: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WorksheetContext = React.createContext<WorksheetContextType<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  undefined as any,
);

export function WorksheetProvider<T>({
  children,
  defaultData = null,
  orientation,
}: {
  children: React.ReactNode;
  defaultData?: T | null;
  orientation: Orientation;
}) {
  const { toPDF, targetRef: ref } = usePDF({
    filename: "worksheet.pdf",
    method: "open",
    page: {
      orientation,
      format: "letter",
      margin: 10,
    },
  });
  const [data, setData] = React.useState<T | null>(defaultData);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const print = () => {
    if (!ref.current) return;
    toPDF(ref.current);
  };

  return (
    <WorksheetContext.Provider
      value={{
        ref,
        data,
        setData,
        settingsOpen,
        setSettingsOpen,
        print,
      }}
    >
      {children}
    </WorksheetContext.Provider>
  );
}

export function useWorksheet<T>() {
  const context = React.useContext<WorksheetContextType<T>>(WorksheetContext);
  if (!context) {
    throw new Error("useWorksheet must be used within a WorksheetProvider");
  }
  return context;
}
