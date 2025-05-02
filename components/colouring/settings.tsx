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
import { ColouringData } from "./colouring.types";
import { GenerateImageApiReturnType } from "@/lib/types";

export function ColouringSettings() {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  const [prompt, setPrompt] = React.useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string>("");
  const { setData } = useWorksheet<ColouringData>();
  const setWorksheetImage = (image: string) => {
    setData({ image });
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Colouring Settings</SheetTitle>
        <SheetDescription>
          Configure your colouring preferences.
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
            const res = await fetch(`/api/generate-image`, {
              method: "POST",
              body: JSON.stringify({
                prompt,
                style: "line",
              }),
            });
            const json = (await res.json()) as GenerateImageApiReturnType;

            if (json.error) {
              throw new Error(json.error.message);
            }

            const dataURI = json.data.dataURI;
            const blob = await fetch(dataURI).then((res) => res.blob());
            const url = URL.createObjectURL(blob);
            setImage(url);
          } catch (error) {
            toast.error((error as Error).message);
            setGeneratedPrompt("");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid grid-cols-1 gap-2.5">
          <Label htmlFor="prompt">Image Description</Label>
          <Input
            id="prompt"
            name="prompt"
            placeholder="Easter egg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={loading}
          />
          <p className="text-sm text-muted-foreground">
            Works best with simple, non-personal objects.
          </p>
        </div>
        <div>
          <div className="w-full h-0 pb-[100%] relative">
            <div className="size-full absolute top-0 left-0 bg-muted rounded-md flex items-center justify-center border">
              {image ? (
                <Image
                  src={image}
                  alt="Generated Image"
                  unoptimized
                  fill
                  className="object-cover"
                />
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
        {image ? (
          <div>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setWorksheetImage(image);
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
