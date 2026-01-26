"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

export function MultiSelect({ options }: { options: string[] }) {
  const anchor = useComboboxAnchor();

  // Initialize with "All" (assuming "All" is one of your options)
  const [selectedValues, setSelectedValues] = React.useState<string[]>(["All"]);

  const handleValueChange = (nextValues: string[]) => {
    // 1. Check if the user just added "All"
    const addedAll =
      nextValues.includes("All") && !selectedValues.includes("All");

    // 2. Check if "All" was already there and they added something else
    const hadAllAndAddedSpecific =
      selectedValues.includes("All") && nextValues.length > 1;

    if (addedAll) {
      // If "All" is selected, clear everything else
      setSelectedValues(["All"]);
    } else if (hadAllAndAddedSpecific) {
      // If "All" was active and a specific item is clicked, remove "All"
      setSelectedValues(nextValues.filter((v) => v !== "All"));
    } else if (nextValues.length === 0) {
      // Fallback: If everything is cleared, default back to "All"
      // (Optional: remove this if you want it to be empty)
      setSelectedValues(["All"]);
    } else {
      // Standard multi-selection
      setSelectedValues(nextValues);
    }
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={options}
      value={selectedValues}
      onValueChange={handleValueChange}
    >
      <ComboboxChips ref={anchor} className="w-fit max-w-84 flex-nowrap">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={
                  selectedValues.length === 0 ? "Select options..." : ""
                }
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
