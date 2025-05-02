export const maxDuration = 60;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return Response.json({
      data: null,
      error: { message: "Prompt is required" },
    });
  }

  const fullPrompt = `Generate a list of 6 objects related to "${prompt}"`;

  if (process.env.NODE_ENV === "development") {
    console.log(`Generating for prompt: ${fullPrompt}`);
  }

  const model = `@cf/meta/llama-4-scout-17b-16e-instruct`;
  const url = `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/${process.env.CLOUDFLARE_AI_GATEWAY_ID}/workers-ai/${model}`;

  try {
    const _response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_KEY}`,
      },
      body: JSON.stringify({
        response_format: {
          type: "json_schema",
          json_schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        messages: [
          {
            content: `Your task is to generate a list of 6 objects based on the query. Write in array of strings format, and ensure each item is a clear and unambiguous object, e.g. apple, banana, orange, grape, strawberry, kiwi, christmas stockings`,
            role: "system",
          },
          { content: fullPrompt, role: "user" },
        ],
      }),
    });

    const result = (await _response.json()) as { result: { response: string } };
    const response = result.result;

    const terms = JSON.parse(
      (response as { response: string }).response,
    ) as string[];

    return Response.json({ data: { terms }, error: null });
  } catch (error) {
    console.error(error);
    return Response.json({
      data: null,
      error: { message: "Failed to generate terms" },
    });
  }
}
