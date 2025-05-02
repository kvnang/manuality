import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Categories } from "./categories";
import { WorksheetData } from "@/lib/types";

export function TemplateCard({
  id,
  title,
  variant,
  icon,
  categories,
  disabled,
}: WorksheetData & {
  id?: string | null;
  disabled?: boolean;
}) {
  const Icon = icon;
  const href = !id ? "#" : `/worksheet/${id}`;

  return (
    <Button
      variant="outline"
      size="lg"
      className="h-auto w-full grid grid-cols-1 gap-4 p-4 text-base rounded-xl aria-disabled:opacity-70 aria-disabled:pointer-events-none"
      disabled={disabled}
      aria-disabled={disabled}
      asChild
    >
      <Link href={href}>
        <div className="w-full relative h-0 pb-[56.25%] bg-background rounded-xl border bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-foreground)]/5">
          <div className="absolute top-0 left-0 size-full flex items-center justify-center">
            <Icon className="size-12 text-muted-foreground" />
          </div>
          <Categories categories={categories} />
        </div>
        <div className="flex justify-between gap-2">
          <h3>{title}</h3>
          {variant ? (
            <Badge className="uppercase font-mono" variant="secondary">
              {variant}
            </Badge>
          ) : null}
        </div>
      </Link>
    </Button>
  );
}
