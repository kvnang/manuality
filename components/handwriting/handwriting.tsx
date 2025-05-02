import * as React from "react";
import { WorksheetSheet } from "../worksheet";
import { notFound } from "next/navigation";
import { WORKSHEET_DATA } from "@/lib/data";
import { WorksheetHeader } from "../worksheet/worksheet-header";
import { WorksheetContent } from "../worksheet/worksheet-content";
import { HandwritingTemplate } from "./handwriting-template";
import { HandwritingSettings } from "./settings";
import { HandwritingData } from "./handwriting.types";

export async function Handwriting({ id }: { id: string }) {
  const data =
    id in WORKSHEET_DATA
      ? WORKSHEET_DATA[id as keyof typeof WORKSHEET_DATA]
      : null;

  if (!data) {
    return notFound();
  }

  const defaultData: HandwritingData = {
    patterns: ["I", "i", "L", "l", "T", "t"].map((letter) => [
      [
        { text: letter },
        { text: letter, variant: "trace" },
        { text: letter, variant: "trace" },
      ],
    ]),
  };

  return (
    <>
      <WorksheetSheet
        orientation="portrait"
        settings={<HandwritingSettings />}
        defaultData={defaultData}
      >
        <WorksheetHeader
          title={data.title}
          variant={data.variant}
          description={data.description}
        />
        <WorksheetContent>
          <HandwritingTemplate />
        </WorksheetContent>
      </WorksheetSheet>
    </>
  );
}
