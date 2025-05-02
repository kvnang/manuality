import { geistMono } from "@/styles/fonts";
import { Badge } from "../ui/badge";

export function WorksheetHeader({
  title,
  variant,
  description,
}: {
  title: string;
  variant?: string;
  description?: string;
}) {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="flex items-center gap-4 justify-between">
        <h1
          className="text-center text-5xl font-bold font-heading"
          style={{ fontWeight: 700, lineHeight: 1 }}
        >
          {title}
        </h1>
        {variant ? (
          <div className="flex items-center justify-center gap-2">
            <Badge
              className="leading-none text-sm"
              variant="outline"
              style={{ ...geistMono.style, fontWeight: 400 }}
            >
              {variant.toUpperCase()}
            </Badge>
          </div>
        ) : null}
      </div>
      {description ? (
        <div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
