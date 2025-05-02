import { cn } from "@/lib/utils";

export function Colophon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-start gap-2 print:hidden",
        className,
      )}
    >
      <span className="text-sm text-muted-foreground font-mono">
        © Built by{" "}
        <a
          href="https://www.kevinang.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          Kevin Ang
        </a>
      </span>
    </div>
  );
}
