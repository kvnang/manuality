"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CheckIcon, MinusIcon, PencilLineIcon, PlusIcon } from "lucide-react";
import { useWorksheet } from "../worksheet/worksheet-provider";
import { HandwritingData, Word } from "./handwriting.types";
import { Toggle } from "../ui/toggle";

export function HandwritingSettings() {
  const { data, setData, setSettingsOpen } = useWorksheet<HandwritingData>();
  const [patterns, _setPatterns] = React.useState(data?.patterns || []);

  const setPatterns: typeof _setPatterns = (v) => {
    const raw = typeof v === "function" ? v(patterns) : v;
    _setPatterns(raw);
    setData({ ...data, patterns: raw });
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Handwriting Settings</SheetTitle>
        <SheetDescription>
          Configure your handwriting preferences.
        </SheetDescription>
      </SheetHeader>
      <form
        className="contents"
        onSubmit={async (e) => {
          e.preventDefault();
          setSettingsOpen(false);
        }}
      >
        <div className="grid grid-cols-1 gap-4 p-4 overflow-auto">
          <div className="grid grid-cols-1 gap-2.5">
            <Label htmlFor="patterns">Patterns</Label>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                className="border rounded-md p-2 grid grid-cols-1 gap-1 bg-muted"
                key={index}
              >
                <Label className="text-sm text-muted-foreground">
                  Row #{index + 1}
                </Label>
                <div className="border rounded-md p-2 bg-background">
                  <Row
                    row={patterns[index]}
                    onRowChange={(row) => {
                      setPatterns((prev) => {
                        const updatedPatterns = [...prev];
                        updatedPatterns[index] = row;
                        return updatedPatterns;
                      });
                    }}
                  />
                </div>
              </div>
            ))}
            {/* <p className="text-sm text-muted-foreground">
              Works best with simple, non-personal objects.
            </p> */}
          </div>
        </div>
        <SheetFooter>
          <div>
            <Button type="submit" className="w-full">
              <CheckIcon className="size-4" />
              Apply
            </Button>
          </div>
        </SheetFooter>
      </form>
    </>
  );
}

function Row({
  row,
  onRowChange,
}: {
  row?: Word[][];
  onRowChange: (row: Word[][]) => void;
}) {
  const maxCol = 4;
  const [col, setCol] = React.useState<number>(row?.length || 1);

  return (
    <div className="grid gap-2 grid-cols-1">
      {Array.from({ length: col }).map((_, index) => {
        if (index >= maxCol) return null;

        const item = row?.[index] || [{ text: "" }];
        return (
          <div key={index} className="grid grid-cols-1 gap-1">
            <div className="flex justify-between items-center gap-2">
              <Label className="text-sm text-muted-foreground">
                Column #{index + 1}
              </Label>
              {index !== 0 && index === col - 1 ? (
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setCol(col - 1)}
                  disabled={col === 1}
                  className="size-6"
                  variant="ghost"
                >
                  <MinusIcon className="size-3.5 text-destructive" />
                </Button>
              ) : null}
            </div>
            <Column
              words={item}
              onWordsChange={(words: Word[]) =>
                onRowChange(
                  row?.map((col, i) => (i === index ? words : col)) || [],
                )
              }
            />
          </div>
        );
      })}
      {col < maxCol && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setCol(col + 1)}
          size="sm"
          className="text-muted-foreground"
        >
          <PlusIcon className="size-4 mr-2 shrink-0" />
          Column
        </Button>
      )}
    </div>
  );
}

function Column({
  words,
  onWordsChange,
}: {
  words: Word[];
  onWordsChange: (words: Word[]) => void;
}) {
  const maxWords = 3;
  const [value, _setValue] = React.useState(words);

  const setValue: typeof _setValue = (v) => {
    const raw = typeof v === "function" ? v(value) : v;
    _setValue(raw);
    onWordsChange(raw);
  };

  return (
    <div className="flex gap-2">
      {value.map((word, index) => (
        <div key={index} className="grid grid-cols-1 gap-1">
          <Input
            value={word.text}
            onChange={(e) => {
              const updatedWord = {
                ...word,
                text: e.target.value,
              };
              setValue((prev) => [
                ...prev.slice(0, index),
                updatedWord,
                ...prev.slice(index + 1),
              ]);
            }}
            // disabled={loading}
          />
          <Toggle
            aria-label="Toggle Trace"
            variant="outline"
            size="sm"
            className="font-normal text-sm text-muted-foreground"
            defaultPressed={word.variant === "trace" ? true : false}
            onPressedChange={(pressed) => {
              const updatedWord = {
                ...word,
                variant: pressed ? ("trace" as const) : undefined,
              };
              setValue((prev) => [
                ...prev.slice(0, index),
                updatedWord,
                ...prev.slice(index + 1),
              ]);
            }}
          >
            <PencilLineIcon className="size-3.5" />
            Trace
          </Toggle>
        </div>
      ))}
      <div className="flex items-center">
        <Button
          type="button"
          size="icon"
          onClick={() => setValue(value.slice(0, -1))}
          disabled={value.length === 1}
          className="size-6"
          variant="ghost"
        >
          <MinusIcon className="size-3.5 text-destructive" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => setValue([...value, { text: "" }])}
          disabled={value.length >= maxWords}
          className="size-6"
          variant="ghost"
        >
          <PlusIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
