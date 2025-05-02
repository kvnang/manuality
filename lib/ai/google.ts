import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const createGoogle = (opts?: { user?: string }) => {
  return createGoogleGenerativeAI({
    baseURL: `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/${process.env.CLOUDFLARE_AI_GATEWAY_ID}/google-ai-studio/v1beta`,
    apiKey: process.env.GOOGLEAI_API_KEY,
    headers: {
      "cf-aig-metadata": JSON.stringify({
        user: opts?.user,
        env: process.env.NODE_ENV === "development" ? "development" : undefined,
      }),
    },
    ...opts,
  });
};

export const google = createGoogle();

export const googleSafetySettings: NonNullable<
  Parameters<typeof google.chat>[1]
>["safetySettings"] = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
  { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "OFF" },
];
