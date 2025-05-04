import { Colouring } from "@/components/colouring";
import { CutPaste } from "@/components/cut-paste";
import { Handwriting } from "@/components/handwriting";
import { WORKSHEET_DATA } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const data =
    id in WORKSHEET_DATA
      ? WORKSHEET_DATA[id as keyof typeof WORKSHEET_DATA]
      : null;

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data =
    id in WORKSHEET_DATA
      ? WORKSHEET_DATA[id as keyof typeof WORKSHEET_DATA]
      : null;

  if (!data) return notFound();

  if (data.type === "cut-paste") {
    return <CutPaste id={id} />;
  }
  if (data.type === "colouring") {
    return <Colouring id={id} />;
  }
  if (data.type === "handwriting") {
    return <Handwriting id={id} />;
  }
  return null;
}

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   return (
//     <Sheet>
//       <div className="grid w-full h-full grid-rows-3 grid-cols-1 border border-foreground">
//         <div className="grid grid-cols-[2fr_3fr]">
//           <Box>
//             <Label>Color it!</Label>
//             <div className="flex items-center justify-center">
//               <span
//                 className="text-[160px] font-extrabold outline-black text-transparent"
//                 style={{
//                   WebkitTextStroke: "4px black",
//                 }}
//               >
//                 Aa
//               </span>
//             </div>
//           </Box>
//           <Box>
//             <Label>Trace it!</Label>
//             <div className="grid grid-col-1 grid-rows-2 gap-6">
//               <div className="relative">
//                 <div className="absolute top-0 left-0 w-full border-t border-1"></div>
//                 <div className="absolute bottom-0 left-0 w-full border-t border-1"></div>
//                 <div className="absolute top-1/2 left-0 w-full border-t border-1 border-dashed"></div>
//                 <div className="absolute top-0 left-0 size-full">
//                   <span className="text-[140px] leading-none decoration-dotted">
//                     Aa
//                   </span>
//                 </div>
//               </div>
//               <div className="relative"></div>
//             </div>
//           </Box>
//         </div>
//         <div className="grid grid-cols-[3fr_2fr]">
//           <Box></Box>
//           <Box></Box>
//         </div>
//         <div className="grid grid-cols-[2fr_3fr]">
//           <Box></Box>
//           <Box></Box>
//         </div>
//       </div>
//     </Sheet>
//   );
// }

// function Label({ children }: { children?: React.ReactNode }) {
//   return <h3 className="text-2xl font-bold text-emerald-500">{children}</h3>;
// }

// function Box({ children }: { children?: React.ReactNode }) {
//   return (
//     <div className="border border-foreground p-4 grid grid-cols-1 grid-rows-[min-content_1fr] gap-4">
//       {children}
//     </div>
//   );
// }
