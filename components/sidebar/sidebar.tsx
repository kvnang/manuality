"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Logo, LogoType } from "../logo";
import { HomeIcon, MessageCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Colophon } from "../colophon";
import { GithubIcon } from "../icons";
import { Button } from "../ui/button";

export function AppSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
    },
    {
      path: "/contact",
      icon: MessageCircleIcon,
      label: "Contact / Feedback",
    },
  ];

  return (
    <div className="print:hidden">
      <Sidebar>
        <SidebarHeader>
          <Link
            href="/"
            rel="home"
            className="inline-flex items-center gap-2 p-2"
          >
            <Logo className="size-10 text-primary" />
            <LogoType className="h-7 w-auto text-blue-900 dark:text-blue-100" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {menu.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.path}
                        className="flex items-center gap-2"
                      >
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button size="icon" variant="ghost" asChild>
            <Link
              href="https://github.com/kvnang/manuality"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-4" />
            </Link>
          </Button>
          <SidebarGroup>
            <Colophon />
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
