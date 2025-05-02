import * as React from "react";
import { WorksheetSheet } from "../worksheet";
import { notFound } from "next/navigation";
import { WORKSHEET_DATA } from "@/lib/data";
import { WorksheetHeader } from "../worksheet/worksheet-header";
import { WorksheetContent } from "../worksheet/worksheet-content";
import { CutPasteSettings } from "./settings";
import { CutPasteContent } from "./cut-paste-content";
import { WorksheetCutPasteImage } from "@/lib/types";
import { Settings2Icon } from "lucide-react";

export async function CutPaste({ id }: { id: string }) {
  const data =
    id in WORKSHEET_DATA
      ? WORKSHEET_DATA[id as keyof typeof WORKSHEET_DATA]
      : null;

  if (!data) {
    return notFound();
  }

  const defaultImages: WorksheetCutPasteImage[] = [
    { text: "Image 1", image: `/assets/cut-paste-spring-1/0.jpg` },
    { text: "Image 2", image: `/assets/cut-paste-spring-1/1.jpg` },
    { text: "Image 3", image: `/assets/cut-paste-spring-1/2.jpg` },
    { text: "Image 4", image: `/assets/cut-paste-spring-1/3.jpg` },
    { text: "Image 5", image: `/assets/cut-paste-spring-1/4.jpg` },
    { text: "Image 6", image: `/assets/cut-paste-spring-1/5.jpg` },
  ];

  return (
    <WorksheetSheet
      orientation="landscape"
      settings={<CutPasteSettings />}
      defaultData={{ images: defaultImages }}
      instructions={
        <>
          Generate different images by adjusting the settings{" "}
          <Settings2Icon className="inline-block size-4" />
        </>
      }
    >
      <WorksheetHeader
        title={data.title}
        variant={data.variant}
        description={data.description}
      />
      <WorksheetContent className="grid-rows-[3fr_1fr] p-px">
        <CutPasteContent />
      </WorksheetContent>
    </WorksheetSheet>
  );
}
