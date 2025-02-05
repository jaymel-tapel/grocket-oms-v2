import { Disclosure } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useRouterState } from "@tanstack/react-router";
import { cleanAuthorization } from "../../utils/utils";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  brandAtom,
  useGetAllBrand,
} from "../../services/queries/brandsQueries";
import DropdownText from "../tools/dropdowntext/DropdownText";
import { useAtom } from "jotai/react";
import { accountantSellerNav, adminNav } from "./NavigationData";
import { useUserAuthContext } from "../../context/UserAuthContext";

const handleLogout = () => {
  cleanAuthorization();
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

const userNavigation = [
  { name: "Your profile", to: "/profile" },
  { name: "Change Password", to: "/change-password" },
  { name: "Sign out", to: "/" },
] as const;

function classNames(...classes: (string | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarNavigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { location } = useRouterState();

  const { data: brands } = useGetAllBrand();
  const [selectedBrand, setSelectedBrand] = useAtom(brandAtom);
  const { user } = useUserAuthContext();

  const brandList = useMemo(() => {
    if (brands) {
      const list = brands.map((brand) => {
        return { id: brand.id, label: brand.name };
      });

      if (!selectedBrand) {
        setSelectedBrand(brands[0]);
      }

      return list;
    }

    return [];
    //eslint-disable-next-line
  }, [brands, selectedBrand]);

  const handleBrandChange = (newBrand: { id: number; label: string }) => {
    const foundBrand = brands?.find((brand) => brand.id === newBrand.id);
    if (!foundBrand) return;

    setSelectedBrand(foundBrand);
  };

  const activeGroup = useMemo(() => {
    if (
      location.pathname.includes("/dashboard") ||
      location.pathname === "/inbox" ||
      location.pathname === "/tasks"
    )
      return { name: "dashboard", index: 0 };

    if (location.pathname.includes("/orders"))
      return { name: "orders", index: 1 };

    if (location.pathname.includes("/clients"))
      return { name: "clients", index: 2 };

    if (location.pathname.includes("/prospects"))
      return { name: "prospects", index: 3 };

    if (location.pathname.includes("/accounts"))
      return { name: "accounts", index: 4 };

    if (location.pathname.includes("/brands"))
      return { name: "brands", index: 5 };

    return "";
  }, [location]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <SidebarComponent activeGroup={activeGroup} user={user} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="no-scrollbar hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <SidebarComponent activeGroup={activeGroup} user={user} />
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1 items-center">
                <DropdownText
                  value={
                    selectedBrand && {
                      id: selectedBrand.id,
                      label: selectedBrand.name,
                    }
                  }
                  onChange={handleBrandChange}
                  list={brandList}
                  removeBorders={true}
                />
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <div className="max-md:hidden flex flex-col mr-6 items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user?.name ?? ""}
                      </span>
                      <span className="ml-auto capitalize">
                        {user?.role?.toLowerCase() ?? ""}
                      </span>
                    </div>
                    <span className="sr-only">Open user menu</span>
                    {user?.profile_image ? (
                      <div className="rounded-full h-8 w-8 overflow-hidden">
                        <img
                          src={user.profile_image}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <span className="flex flex-col lg:flex lg:items-center">
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => {
                        return (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.to}
                                params={
                                  item.name === "Your profile"
                                    ? {
                                        userId: user?.id ?? 1,
                                      }
                                    : true
                                }
                                onClick={
                                  item.name === "Sign out"
                                    ? () => handleLogout()
                                    : undefined
                                }
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900 hover:cursor-pointer"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarComponent(props) {
  const navigation = useMemo(() => {
    if (props?.user?.role === "ADMIN") {
      return adminNav;
    }

    return accountantSellerNav;
  }, [props?.user]);

  return (
    <div className="no-scrollbar flex grow flex-col overflow-y-auto bg-[#1C2434] px-6 pb-4 ring-1 ring-white/10">
      <div className="flex items-center justify-center">
        <div className="flex justify-center gap-4 py-8">
          <p className="text-4xl text-white font-bold">OMS</p>
          <p className="capitalize border-none bg-[#41B2E9] font-medium text-sm text-white rounded-md self-center py-1.5 px-3">
            {props?.user?.role?.toLowerCase() ?? "Seller"}
          </p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-4">
              {navigation.map((item, index) => {
                const isActiveGroup =
                  props.activeGroup.name === item.name.toLowerCase();

                return (
                  <li key={index}>
                    {!item.children ? (
                      <Link
                        to={item.to}
                        className={classNames(
                          isActiveGroup ? "bg-GrBlue-base" : "",
                          "group hover:bg-gray-50 flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700"
                        )}
                        params={true}
                      >
                        {/* <item.icon
                 className="h-6 w-6  shrink-0 text-gray-400"
                 aria-hidden="true"
                /> */}
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div" defaultOpen={isActiveGroup}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                isActiveGroup
                                  ? "bg-[#41B2E9] text-white"
                                  : "bg-[#333A48]",
                                "flex items-center hover:bg-[#41B2E9] w-full text-left rounded-md p-2 px-4 gap-x-3 text-sm leading-6 text-[#DEE4EE]"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  isActiveGroup ? "active icon" : "icon",
                                  "h-6 w-6 shrink-0 text-inherit"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "rotate-180" : "",
                                  "ml-auto h-5 w-5 shrink-0 text-white icon"
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="mt-3 px-6">
                              {item.children?.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    to={subItem.to}
                                    className={
                                      "block py-2 pr-2 text-sm leading-6 text-[#8A99AF]"
                                    }
                                    activeProps={{ className: `text-white` }}
                                    params={true}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
