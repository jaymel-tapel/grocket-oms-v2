import { useVirtualizer } from "@tanstack/react-virtual";
import { Check } from "lucide-react";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../tools/command/Command";
import { cn } from "../../../../utils/utils";
import { City } from "../FindProspectsContext";

interface VirtualizedCitySelectorProps {
  height: string;
  options: City[];
  placeholder: string;
  onSelectOption?: (option: string) => void;
  onSelectAll?: () => void;
}

const VirtualizedCitySelector = ({
  height,
  options,
  placeholder,
  onSelectOption,
  onSelectAll,
}: VirtualizedCitySelectorProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState<City[]>(options);
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
        option.name.toLowerCase().includes(search.toLowerCase() ?? [])
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
          <CommandItem className="cursor-pointer" onSelect={onSelectAll}>
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                options.every((city) => city.checked)
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
            Select All Cities
          </CommandItem>
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
              key={filteredOptions[virtualOption.index].name}
              value={filteredOptions[virtualOption.index].name}
              onSelect={onSelectOption}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  filteredOptions[virtualOption.index].checked
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {filteredOptions[virtualOption.index].name}
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

export default VirtualizedCitySelector;
