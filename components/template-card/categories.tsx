import { WORKSHEET_CATEGORIES } from "@/lib/data";
import { WorksheetCategory } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function Categories({
  categories,
}: {
  categories?: WorksheetCategory[];
}) {
  if (!categories?.length) {
    return null;
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      {categories.map((id) => {
        const category = WORKSHEET_CATEGORIES.find(
          (category) => category.id === id,
        );

        if (!category) {
          return null;
        }

        const Icon = category.icon;

        return (
          <div key={category.id}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="relative z-10 text-primary bg-primary/10 size-8 flex items-center justify-center rounded-md">
                  <Icon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>{category.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}
    </div>
  );
}
