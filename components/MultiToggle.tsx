"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ExclusiveToggleGroupProps {
  options: { label: string; value: string }[];
  onSelectionChange?: (values: string[]) => void;
  className?: string;
}

export function ExclusiveToggleGroup({
  options,
  onSelectionChange,
  className,
}: ExclusiveToggleGroupProps) {
  const ALL_VALUE = "all";
  const [selected, setSelected] = React.useState<string[]>([ALL_VALUE]);

  const handleValueChange = (newValues: string[]) => {
    let finalValues: string[];

    // 1. If everything is deselected, default back to "All"
    if (newValues.length === 0) {
      finalValues = [ALL_VALUE];
    }
    // 2. If "All" was just clicked
    else if (newValues.includes(ALL_VALUE) && !selected.includes(ALL_VALUE)) {
      finalValues = [ALL_VALUE];
    }
    // 3. If "All" was already there and a specific item was clicked
    else if (selected.includes(ALL_VALUE) && newValues.length > 1) {
      const specificOnly = newValues.filter((v) => v !== ALL_VALUE);

      // CHECK: If user just selected the very last specific option,
      // switch back to "All" instead of showing every individual chip
      if (specificOnly.length === options.length) {
        finalValues = [ALL_VALUE];
      } else {
        finalValues = specificOnly;
      }
    }
    // 4. Normal selection - but still check if the latest toggle completes the set
    else {
      const specificOnly = newValues.filter((v) => v !== ALL_VALUE);
      if (specificOnly.length === options.length) {
        finalValues = [ALL_VALUE];
      } else {
        finalValues = newValues;
      }
    }

    setSelected(finalValues);
    onSelectionChange?.(finalValues);
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={selected}
      onValueChange={handleValueChange}
      className={className}
    >
      <ToggleGroupItem value={ALL_VALUE}>All</ToggleGroupItem>

      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
