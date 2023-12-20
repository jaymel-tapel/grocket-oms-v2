import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface IsDropDownItem {
  id: number | string;
  label: string;
}

interface IsProps {
  label?: string;
  value?: IsDropDownItem;
  onChange?: (val: IsDropDownItem) => void;
  list?: IsDropDownItem[];
  className?: string;
  disabled?: boolean;
  removeBorders?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const buttonClassName =
  "relative w-full cursor-pointer rounded-sm h-10 pl-3 pr-10 text-left text-gray-900 outline-none focus:ring-grBlue-base sm:text-sm sm:leading-6";

const DropdownText: React.FC<IsProps> = ({
  label,
  value = { id: "", label: "None" },
  onChange,
  list = [{ id: "", label: "None" }],
  className = "w-40",
  disabled = false,
  removeBorders = false,
}) => {
  return (
    <Listbox
      value={value}
      by={"id"}
      onChange={(val) => onChange && onChange(val)}
    >
      {({ open }) => (
        <div className={`flex flex-col ${className}`}>
          {label ? (
            <Listbox.Label className="block text-sm font-medium leading-6 text-black">
              {label}
            </Listbox.Label>
          ) : (
            ""
          )}
          <div className={`relative ${label && "mt-2"} w-full`}>
            <Listbox.Button
              className={`${buttonClassName} ${
                disabled ? "pointer-events-none bg-gray-300 text-gray-200" : ""
              } ${
                removeBorders
                  ? "ring-0 shadow-none focus:ring-0"
                  : open
                  ? "shadow-sm ring-1 ring-inset ring-grBlue-base"
                  : "shadow-sm ring-1 ring-inset ring-gray-300"
              }`}
            >
              <span className="block truncate">{value.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className={`h-5 w-5 ${
                    disabled ? "text-gray-200" : "text-black"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active, selected }) =>
                      classNames(
                        active || selected
                          ? "bg-grBlue-base text-white"
                          : "text-gray-900",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                    disabled={disabled}
                  >
                    {item.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default DropdownText;
