import { LucideIcon } from "lucide-react";
import { WORKSHEET_CATEGORIES } from "./data";

export type Orientation = "landscape" | "portrait";

export interface WorksheetCutPasteImage {
  text: string;
  image: string;
}

export type WorksheetCategory = (typeof WORKSHEET_CATEGORIES)[number]["id"];

export interface WorksheetData {
  type: string;
  title: string;
  description?: string;
  variant?: string;
  icon: LucideIcon;
  categories?: WorksheetCategory[];
}

export type GenerateImageApiReturnType =
  | { data: { dataURI: string }; error: null }
  | { data: null; error: { message: string } };

export type GenerateTermsApiReturnType =
  | { data: { terms: string[] }; error: null }
  | { data: null; error: { message: string } };
