export function WorksheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex-1 w-full grid grid-cols-1 gap-6 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
