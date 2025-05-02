"use client";

import * as React from "react";
import Image from "next/image";
import { useWorksheet } from "../worksheet/worksheet-provider";
import { ScissorsLineDashedIcon } from "lucide-react";
import { CutPasteData } from "./cut-paste.types";

export function CutPasteContent() {
  const { data } = useWorksheet<CutPasteData>();
  const { images } = data || {};

  const getRowImages = (rowIndex: number) => {
    if (!images?.length) return [];

    const rowImages = [
      images[rowIndex * imagesPerRow],
      images[rowIndex * imagesPerRow + 1],
    ];
    return rowImages;
  };

  const rows = 3;
  const imagesPerRow = 2;
  const pattern: [0 | 1, 0 | 1, 0 | 1][] = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
  ];
  const toCut: [number[], number[], number[]] = [
    [0, 5],
    [2, 7],
    [1, 8],
  ];

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-3 gap-4">
        {Array.from({ length: rows }).map((_, i) => {
          const images = getRowImages(i);
          const rowPattern = pattern[i];

          return (
            <div key={i} className="grid grid-cols-9 items-center">
              {Array.from({ length: 9 }).map((_, j) => {
                const isCut = toCut[i].includes(j);
                return (
                  <div key={j} className="-mx-0.5">
                    <div className="relative w-full h-0 pb-[100%] flex items-center justify-center border-2 overflow-hidden bg-background">
                      {!isCut ? (
                        <Image
                          unoptimized
                          src={images[rowPattern[j % rowPattern.length]].image}
                          alt={images[rowPattern[j % rowPattern.length]].text}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 items-center">
        <div
          className="grid grid-cols-9 relative"
          style={{ transform: `translateX(${(3 / 9 / 2) * 100}%)` }}
        >
          {toCut.map((row, i) => {
            const images = getRowImages(i);
            const rowPattern = pattern[i % pattern.length];
            return (
              <React.Fragment key={i}>
                {row.map((j) => (
                  <div key={j} className="-mx-0.5">
                    <div className="relative w-full h-0 pb-[100%] flex items-center justify-center border-2 border-dashed overflow-hidden bg-background">
                      <Image
                        unoptimized
                        src={images[rowPattern[j % rowPattern.length]].image}
                        alt={images[rowPattern[j % rowPattern.length]].text}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
          <ScissorsLineDashedIcon className="absolute top-0 left-0 size-8 -translate-y-1/2 -translate-x-full stroke-1 mt-px" />
        </div>
      </div>
    </>
  );
}
