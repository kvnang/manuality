import {
  BookOpenTextIcon,
  CircuitBoardIcon,
  LucideIcon,
  PaletteIcon,
  PencilLineIcon,
  ScissorsIcon,
} from "lucide-react";
import { WorksheetCategory } from "./types";

export const WORKSHEET_CATEGORIES = [
  {
    id: "reading" as const,
    name: "Reading",
    icon: BookOpenTextIcon,
  },
  {
    id: "writing" as const,
    name: "Writing",
    icon: PencilLineIcon,
  },
  {
    id: "fine-motor" as const,
    name: "Fine Motor Skills",
    icon: ScissorsIcon,
  },
  {
    id: "logic" as const,
    name: "Logic",
    icon: CircuitBoardIcon,
  },
];

export const WORKSHEET_DATA: Record<
  string,
  {
    type: string;
    title: string;
    description: string;
    variant?: string;
    icon: LucideIcon;
    categories: WorksheetCategory[];
  }
> = {
  "cut-paste-spring-1": {
    type: "cut-paste",
    title: "Cut and Paste",
    description: `Cut out the pictures at the bottom of the page. Paste the pictures in the blank spaces to complete the patterns.`,
    icon: ScissorsIcon,
    categories: ["fine-motor", "logic"],
  },
  colouring: {
    type: "colouring",
    title: "Colouring",
    description: `Colour the pictures and try to stay within the lines.`,
    icon: PaletteIcon,
    categories: ["fine-motor", "writing"],
  },
  handwriting: {
    type: "handwriting",
    variant: "Manuscript",
    title: "Handwriting",
    description: `Practice writing the letters and words in manuscript style.`,
    icon: PencilLineIcon,
    categories: ["writing"],
  },
};
