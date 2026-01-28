"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

/**
 * Calculates the Sunday of the week for a given date
 */
function getSunday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  const sunday = getSunday(date);

  const formattedDate = sunday.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `Week of ${formattedDate}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface WeekSelectorProps {
  onWeekChange?: (sundayDate: Date) => void;
}

export function WeekSelector({ onWeekChange }: WeekSelectorProps) {
  const [open, setOpen] = React.useState(false);
  // Initialize with the Sunday of the current week
  const [date, setDate] = React.useState<Date | undefined>(
    getSunday(new Date()),
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Notify parent when date changes
  React.useEffect(() => {
    if (date && onWeekChange) {
      onWeekChange(date);
    }
  }, [date, onWeekChange]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const sunday = getSunday(selectedDate);
      setDate(sunday);
      setValue(formatDate(sunday));
      setOpen(false);
    }
  };

  const handleToday = () => {
    const sunday = getSunday(new Date());
    setDate(sunday);
    setMonth(sunday);
    setValue(formatDate(sunday));
  };

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Set to today&apos;s week</p>
        </TooltipContent>
      </Tooltip>
      <InputGroup className="min-w-56 mx-auto">
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="Select a week"
          onChange={(e) => {
            const inputValue = e.target.value;
            setValue(inputValue);

            // Clean the string to try and parse a date if user types
            const cleanValue = inputValue.replace("Week of ", "");
            const parsedDate = new Date(cleanValue);

            if (isValidDate(parsedDate)) {
              const sunday = getSunday(parsedDate);
              setDate(sunday);
              setMonth(sunday);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleSelect}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </ButtonGroup>
  );
}
