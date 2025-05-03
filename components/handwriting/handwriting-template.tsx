"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { HandwritingData, Word } from "./handwriting.types";
import { useWorksheet } from "../worksheet/worksheet-provider";
import { eduSaBeginner } from "@/styles/fonts";

export function HandwritingTemplate() {
  const { data } = useWorksheet<HandwritingData>();
  const patterns = data?.patterns;

  return (
    <div>
      <Guides>
        {patterns?.map((pattern, i) => (
          <React.Fragment key={i}>
            <Guide columns={pattern} />
            <Guide />
          </React.Fragment>
        ))}
      </Guides>
    </div>
  );
}

function Guides({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-0">{children}</div>;
}

const SIZE = 64;

function Guide({ columns }: { columns?: Array<Array<Word>> }) {
  return (
    <div className="relative w-full">
      <div
        className="group w-full grid grid-cols-1 grid-rows-4 items-start"
        style={{ gap: `${SIZE / 3}px` }}
      >
        <div className="w-full border-y border-foreground border-b-transparent"></div>
        <div className="w-full border-y border-dashed border-b-transparent"></div>
        <div className="w-full border-y border-red-500"></div>
        <div className="w-full border-y border-t-transparent group-last:border-b-foreground"></div>
      </div>
      {columns?.length ? (
        <div className="absolute top-0 left-0 size-full flex">
          {columns.map((col, i) => {
            return (
              <div
                key={i}
                className={cn("flex-1 flex space-x-4")}
                style={{
                  ...eduSaBeginner.style,
                  lineHeight: `${SIZE * 0.8}px`,
                  fontSize: `${SIZE}px`,
                }}
              >
                {col.map((word, i) => {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "",
                        word.variant === "trace" ? "text-muted-foreground" : "",
                      )}
                    >
                      {word.text}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
