"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { WeekSelector } from "@/components/DatePicker";
import { ExclusiveToggleGroup } from "@/components/MultiToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, List } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-700 flex flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image src="/convex.svg" alt="Convex Logo" width={32} height={32} />
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <Image
              src="/nextjs-icon-light-background.svg"
              alt="Next.js Logo"
              width={32}
              height={32}
              className="dark:hidden"
            />
            <Image
              src="/nextjs-icon-dark-background.svg"
              alt="Next.js Logo"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </div>
          <h1 className="font-semibold text-slate-800 dark:text-slate-200">
            Convex + Next.js + Convex Auth
          </h1>
        </div>
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <section className="flex flex-row gap-4 flex-wrap">
          <ToggleGroup variant="outline" defaultValue="list" type="single">
            <ToggleGroupItem value="list" className="p-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-full w-full items-center justify-center px-3">
                    <List />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List View</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>

            <ToggleGroupItem value="calendar" className="p-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-full w-full items-center justify-center px-3">
                    <Calendar />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calendar View</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>

          <WeekSelector />

          <ExclusiveToggleGroup
            options={[
              { label: "Office Hours", value: "office_hours" },
              { label: "Coverage", value: "coverage" },
              { label: "Weekend Duty", value: "weekend_duty" },
              { label: "Security", value: "security" },
            ]}
          />

          <Select defaultValue="all">
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a building" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Buildings</SelectLabel>
                <SelectItem value="all">All Buildings</SelectItem>
                <SelectItem value="geisert">Geisert Hall</SelectItem>
                <SelectItem value="harper">Harper Hall</SelectItem>
                <SelectItem value="heitz">Heitz Hall</SelectItem>
                <SelectItem value="singles">Singles</SelectItem>
                <SelectItem value="williams">Williams Hall</SelectItem>
                <SelectItem value="university">University Hall</SelectItem>
                <SelectItem value="sac">Student Apartment Complex</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
}
