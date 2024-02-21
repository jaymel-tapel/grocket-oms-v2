import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../tools/command/Command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../tools/popover/Popover.tsx";
import { Button } from "../../tools/buttons/Button.tsx";
import { Seller } from "../../../services/queries/sellerQueries.ts";

type Props = {
  buttonLabel?: string;
  sellers: Seller[];
  setSelectedSellers: React.Dispatch<React.SetStateAction<Seller[]>>;
};

const TransferSellersSelector: React.FC<Props> = ({
  sellers,
  setSelectedSellers,
  buttonLabel,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (email: string) => {
    const foundSeller = sellers?.find((seller) => seller.email === email);
    if (!foundSeller) return;

    buttonLabel
      ? setSelectedSellers([foundSeller])
      : setSelectedSellers((prev) => [...prev, foundSeller]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {buttonLabel ? buttonLabel : "Select sellers"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen sm:max-w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search sellers..." />
          <CommandEmpty>No sellers found.</CommandEmpty>
          <CommandGroup>
            {sellers?.map((seller) => (
              <CommandItem
                key={seller.id}
                value={seller.email}
                onSelect={(currentValue) => {
                  handleSelect(currentValue);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                {seller.email}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TransferSellersSelector;
