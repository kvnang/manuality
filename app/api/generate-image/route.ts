import { google, googleSafetySettings } from "@/lib/ai/google";
import { generateText } from "ai";

export const maxDuration = 60;

const PROVIDER: "gemini" | "flux" = "gemini";

export async function POST(request: Request) {
  const { prompt, style } = await request.json();

  if (!prompt) {
    return Response.json(
      { data: null, error: { message: "Prompt is required" } },
      { status: 400 },
    );
  }

  const imageStyle: "line" | "colour" = style || "line";

  const fullPrompt =
    imageStyle === "line"
      ? `Simple outline drawing of "${prompt}", for kids coloring page, in black and white with minimal background`
      : `Minimalist drawing of "${prompt}", in cartoon style and flat colors, with minimal background`;

  if (process.env.NODE_ENV === "development") {
    console.log(`Generating image for prompt: ${fullPrompt}`);
  }

  if (PROVIDER === "gemini") {
    const result = await generateText({
      model: google("gemini-2.0-flash-exp", {
        safetySettings: googleSafetySettings,
      }),
      providerOptions: {
        google: { responseModalities: ["TEXT", "IMAGE"] },
      },
      prompt: `You are an AI art generator. Your task is to generate a drawing ${imageStyle === "line" ? `in line art style for kids coloring page, in black and white with minimal background.` : `in minimalistic cartoon, flat-color style with minimal background.`} Think step-by-step. First, analyze the important elements. Second, generate the image. Generate an image of "${prompt}"`,
    });

    let dataURI: string = "";

    for (const file of result.files) {
      // @ts-expect-error Wrong type from package
      const base64 = file.base64Data;
      if (file.mimeType.startsWith("image/") && base64) {
        dataURI = `data:${file.mimeType};charset=utf-8;base64,${base64}`;
        break;
      }
    }

    if (!dataURI) {
      return Response.json({
        data: null,
        error: { message: "No image generated" },
      });
    }

    return Response.json({ data: { dataURI }, error: null });
  }

  const model = `@cf/black-forest-labs/flux-1-schnell`;
  const url = `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/${process.env.CLOUDFLARE_AI_GATEWAY_ID}/workers-ai/${model}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CF_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: fullPrompt,
      width: 1024,
      height: 1024,
    }),
  });

  if (model.includes("flux-1-schnell")) {
    const json = await response.json();

    if ("errors" in json && json.errors.length > 0) {
      return Response.json({
        data: null,
        error: { message: json.errors[0].message || "Unknown error" },
      });
    }
    const base64 = json.result.image;
    const dataURI = `data:image/jpeg;charset=utf-8;base64,${base64}`;
    return Response.json({ data: { dataURI }, error: null });
  } else {
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataURI = `data:image/jpeg;charset=utf-8;base64,${base64}`;
    return Response.json({ data: { dataURI }, error: null });
  }
}
