"use client";

import Image from "next/image";
import { useWorksheet } from "../worksheet/worksheet-provider";
import { ColouringData } from "./colouring.types";

export function ColouringImage() {
  const { data } = useWorksheet<ColouringData>();
  const { image } = data || {};

  return (
    <div className="relative border-2 rounded-md overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt="Colouring Image"
          // width={500}
          // height={500}
          unoptimized
          fill
          className="object-contain"
        />
      ) : null}
      {/* <div className="absolute bottom-1 right-1 size-40 z-10 border-2 rounded-md overflow-hidden">
        <Image
          src={imageSrc}
          alt="Colouring Image"
          unoptimized
          fill
          className="object-cover"
        />
      </div> */}
    </div>
  );
}
