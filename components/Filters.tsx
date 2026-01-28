"use client";

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
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FiltersProps {
  onWeekChange?: (sundayDate: Date) => void;
}

export function Filters({ onWeekChange }: FiltersProps) {
  return (
    <div className="flex flex-row gap-4 w-full">
      {/* <ToggleGroup variant="outline" defaultValue="list" type="single">
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
      </ToggleGroup> */}

      <WeekSelector onWeekChange={onWeekChange} />

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
    </div>
  );
}
