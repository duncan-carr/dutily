"use client";

import * as React from "react";
import { Calendar } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const data = {
  navMain: [
    {
      title: "Duty",
      items: [
        {
          title: "My Calendar",
          url: "",
        },
        {
          title: "Open Shifts",
          url: "#",
        },
      ],
    },
    {
      title: "My Floor",
      items: [
        {
          title: "Programming",
          url: "#",
        },
        {
          title: "Bulletin Board",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
};

const adminData = {
  navMain: [
    {
      title: "Admin",
      items: [
        {
          title: "Assign Shifts",
          url: "#",
        },
        {
          title: "Employees",
          url: "/admin/employees",
        },
        {
          title: "Configuration",
          url: "/admin/configuration",
          isActive: true,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useQuery(api.users.row);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Calendar className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Dutily</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <p className="font-medium">{item.title}</p>
                </SidebarMenuButton>

                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url} className="flex justify-between">
                            {item.title}
                            {/* TODO: Pull # of open shifts from DB */}
                            {item.title === "Open Shifts" && (
                              <Badge className="w-5 h-5" variant={"default"}>
                                {/* Switch variant to destructive to grab attention? */}
                                4
                              </Badge>
                            )}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {/* TODO: Restrict view if not authorized */}
        {user?.role === "admin" && (
          <>
            <Separator />
            <SidebarGroup>
              <SidebarMenu>
                {adminData.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <p className="font-medium">{item.title}</p>
                    </SidebarMenuButton>

                    {item.items?.length ? (
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a
                                href={item.url}
                                className="flex justify-between"
                              >
                                {item.title}
                                {/* TODO: Pull # of open shifts from DB */}
                                {item.title === "Open Shifts" && (
                                  <Badge
                                    className="w-5 h-5"
                                    variant={"default"}
                                  >
                                    {/* Switch variant to destructive to grab attention? */}
                                    4
                                  </Badge>
                                )}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
