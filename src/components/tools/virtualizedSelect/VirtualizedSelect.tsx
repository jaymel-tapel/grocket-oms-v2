import { useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../tools/command/Command";
// import { cn } from "../../../utils/utils";

interface VirtualizedSelectProps {
  height: string;
  options: string[];
  placeholder: string;
  onSelectOption?: (option: string) => void;
  // onSelectAll?: () => void;
}

const VirtualizedSelect = ({
  height,
  options,
  placeholder,
  onSelectOption,
}: // onSelectAll,
VirtualizedSelectProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<string[]>(options);
  const [search, setSearch] = React.useState("");
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  React.useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase() ?? [])
      )
    );
  }, [options, search]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder={placeholder}
      />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        style={{
          height: height,
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              style={{
                position: "absolute",
                top: 35,
                left: 0,
                width: "100%",
                height: `${virtualOption.size}px`,
                transform: `translateY(${virtualOption.start}px)`,
              }}
              key={filteredOptions[virtualOption.index]}
              value={filteredOptions[virtualOption.index]}
              onSelect={onSelectOption}
            >
              {/* <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  filteredOptions[virtualOption.index]
                    ? "opacity-100"
                    : "opacity-0"
                )}
              /> */}
              {filteredOptions[virtualOption.index]}
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

export default VirtualizedSelect;
