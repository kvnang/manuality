export interface Word {
  text: string;
  variant?: "default" | "trace";
}

export interface HandwritingData {
  patterns: Word[][][];
}
