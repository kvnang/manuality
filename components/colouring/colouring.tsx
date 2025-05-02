import * as React from "react";
import { WorksheetSheet } from "../worksheet";
import { notFound } from "next/navigation";
import { WORKSHEET_DATA } from "@/lib/data";
import { WorksheetHeader } from "../worksheet/worksheet-header";
import { WorksheetContent } from "../worksheet/worksheet-content";
import { ColouringSettings } from "./settings";
import { ColouringImage } from "./colouring-image";
import { Settings2Icon } from "lucide-react";

export async function Colouring({ id }: { id: string }) {
  const data =
    id in WORKSHEET_DATA
      ? WORKSHEET_DATA[id as keyof typeof WORKSHEET_DATA]
      : null;

  if (!data) {
    return notFound();
  }

  return (
    <>
      <WorksheetSheet
        orientation="portrait"
        settings={<ColouringSettings />}
        defaultData={{ image: `/assets/colouring/snowman.jpg` }}
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
        <WorksheetContent>
          <ColouringImage />
        </WorksheetContent>
      </WorksheetSheet>
    </>
  );
}
