import { Orientation } from "./types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://www.manuality.com"
    : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : "http://localhost:3000";

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
