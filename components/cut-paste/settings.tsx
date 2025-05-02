"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import {
  CheckIcon,
  ImageIcon,
  Loader2Icon,
  RefreshCwIcon,
  SparklesIcon,
} from "lucide-react";
import { useWorksheet } from "../worksheet/worksheet-provider";
import { toast } from "sonner";
import {
  GenerateImageApiReturnType,
  GenerateTermsApiReturnType,
  WorksheetCutPasteImage,
} from "@/lib/types";
import { CutPasteData } from "./cut-paste.types";

export function CutPasteSettings() {
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<WorksheetCutPasteImage[] | null>(
    null,
  );
  const [prompt, setPrompt] = React.useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string>("");
  const { setData } = useWorksheet<CutPasteData>();
  const setWorksheetImages = (images: WorksheetCutPasteImage[]) => {
    setData({ images });
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Cut and Paste Settings</SheetTitle>
        <SheetDescription>
          Configure your cut-and-paste preferences.
        </SheetDescription>
      </SheetHeader>
      <form
        className="grid grid-cols-1 gap-4 p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(e.currentTarget);

          const prompt = formData.get("prompt") as string | undefined;

          if (!prompt) {
            console.error("Prompt is required");
            return;
          }
          setGeneratedPrompt(prompt);

          try {
            const res = await fetch(`/api/generate-terms`, {
              method: "POST",
              body: JSON.stringify({
                prompt,
              }),
            });
            const json = (await res.json()) as GenerateTermsApiReturnType;

            if (json.error) {
              throw new Error(json.error.message);
            }

            const { terms } = json.data;

            const newImages = await Promise.all(
              terms.map(async (term) => {
                const res = await fetch(`/api/generate-image`, {
                  method: "POST",
                  body: JSON.stringify({
                    prompt: term,
                    style: "colour",
                  }),
                });

                const json = (await res.json()) as GenerateImageApiReturnType;

                if ("error" in json && json.error) {
                  throw new Error(json.error.message);
                }

                const { dataURI } = json.data;

                const blob = await fetch(dataURI).then((res) => res.blob());
                const url = URL.createObjectURL(blob);
                return { text: term, image: url };
              }),
            );

            setImages(newImages);
          } catch (error) {
            toast.error((error as Error).message);
            setGeneratedPrompt("");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid grid-cols-1 gap-2.5">
          <Label htmlFor="prompt">Theme Description</Label>
          <Input
            id="prompt"
            name="prompt"
            placeholder="Easter"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <div className="w-full h-0 pb-[100%] relative">
            <div className="size-full absolute top-0 left-0 bg-muted rounded-md flex items-center justify-center border">
              {images?.length ? (
                <div className="size-full p-1">
                  <div className="grid grid-cols-3 grid-row-2 gap-1 size-full rounded-md overflow-hidden">
                    {images.map((image) => (
                      <div
                        key={image.text}
                        className="relative overflow-hidden size-full"
                      >
                        <Image
                          src={image.image}
                          alt={image.text}
                          className="size-full object-cover"
                          fill
                          unoptimized
                        />
                        <div className="absolute bottom-0 left-0 w-full flex items-center justify-center text-center p-1">
                          <span className="truncate inline-block rounded-md bg-muted/50 px-2 leading-none py-1 text-xs">
                            {image.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <ImageIcon className="size-8 text-muted-foreground"></ImageIcon>
                  <p className="text-muted-foreground text-sm">
                    Start by describing your image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !prompt.length}
          >
            {loading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : generatedPrompt ? (
              <RefreshCwIcon className="size-4" />
            ) : (
              <SparklesIcon className="size-4" />
            )}
            {generatedPrompt ? "Regenerate" : "Generate"}
          </Button>
        </div>
        {images?.length ? (
          <div>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setWorksheetImages(images);
                setPrompt("");
              }}
            >
              <CheckIcon className="size-4" />
              Apply
            </Button>
          </div>
        ) : null}
      </form>
    </>
  );
}
