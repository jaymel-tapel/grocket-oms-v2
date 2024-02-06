import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { cn } from "../../../utils/utils";
import {
  ClientsFiltersType,
  UsersFiltersType,
  OrdersFiltersType,
} from "../../../pages/routeFilters";

type Props = {
  activeFilter?: UsersFiltersType | ClientsFiltersType | OrdersFiltersType;
  filterOptions: ReadonlyArray<
    UsersFiltersType | ClientsFiltersType | OrdersFiltersType
  >;
  handleChange: (
    filter: UsersFiltersType | ClientsFiltersType | OrdersFiltersType
  ) => void;
  label?: string;
};

const FiltersButton: React.FC<Props> = ({
  activeFilter,
  filterOptions,
  handleChange,
  label = "",
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-400 whitespace-nowrap shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <FunnelIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          {label.length > 0 ? label : "Filters"}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filterOptions.map((filter, index) => {
              return (
                <Menu.Item key={index}>
                  <div
                    className={cn(
                      activeFilter === filter
                        ? "bg-grBlue-base text-white"
                        : "text-gray-700",
                      "uppercase cursor-pointer px-4 py-2 text-sm hover:bg-grBlue-base hover:text-white"
                    )}
                    onClick={() => handleChange(filter)}
                  >
                    {filter}
                  </div>
                </Menu.Item>
              );
            })}
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FiltersButton;
