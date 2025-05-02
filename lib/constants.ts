import { Orientation } from "./types";

export const WORKSHEET_SIZES: Record<
  Orientation,
  { width: number; height: number }
> = {
  landscape: {
    width: 279,
    height: 215.9,
  },
  portrait: {
    width: 215.9,
    height: 279,
  },
};
