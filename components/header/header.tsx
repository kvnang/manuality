import Link from "next/link";
import { Logo, LogoType } from "../logo";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
  return (
    <header className="w-full p-2 border-b flex items-center md:hidden bg-background">
      <SidebarTrigger />
      <Link href="/" rel="home" className="inline-flex items-center gap-2 p-2">
        <Logo className="size-10" />
        <LogoType className="h-7 w-auto" />
      </Link>
    </header>
  );
}
