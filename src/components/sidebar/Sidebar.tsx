import { Disclosure } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  GlobeAltIcon,
  KeyIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link, useRouterState } from "@tanstack/react-router";

const userNavigation = [
  { name: "Your profile", to: "#" },
  { name: "Sign out", to: "#" },
];

function classNames(...classes: (string | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarNavigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { location } = useRouterState();

  const activeGroup = useMemo(() => {
    if (
      location.pathname === "/dashboard" ||
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
                  <SidebarComponent activeGroup={activeGroup} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="no-scrollbar hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <SidebarComponent activeGroup={activeGroup} />
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
              <div className="flex flex-1">
                <p className="relative flex gap-2 mt-5">
                  G-Rocket
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </p>
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
                    <div className="flex flex-col mr-6 items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Jaymel Tapel
                      </span>
                      <span className="ml-auto">Admin</span>
                    </div>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="flex flex-colhidden lg:flex lg:items-center">
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
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.to}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
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
    return [
      {
        name: "Dashboard",
        to: "/dashboard",
        icon: Squares2X2Icon,
        children: [
          { name: "My Dashboard", to: "/dashboard" },
          { name: "My Inbox", to: "/inbox" },
          { name: "My Tasks", to: "/tasks" },
        ],
      },
      {
        name: "Orders",
        to: "/orders",
        icon: ClipboardDocumentCheckIcon,
        children: [
          { name: "Orders Report", to: "/orders/orders_report" },
          { name: "Orders Manager", to: "/orders/orders_manager" },
          { name: "Deleted Orders", to: "/orders/deleted" },
        ],
      },
      {
        name: "Clients",
        to: "/clients",
        icon: UserGroupIcon,
        children: [
          { name: "Client Report", to: "/clients/clients_report" },
          {
            name: "Clients Manager",
            to: "/clients/clients_manager",
          },
        ],
      },
      {
        name: "Prospects",
        to: "/prospects",
        icon: MagnifyingGlassIcon,
        children: [
          { name: "My Prospects", to: "#" },
          { name: "Email Templates", to: "#" },
        ],
      },
      {
        name: "Accounts",
        to: "/accounts",
        icon: KeyIcon,
        children: [
          { name: "Seller Report", to: "/accounts/seller_reports" },
          { name: "Users Manager", to: "/accounts/users_manager" },
          {
            name: "Inactive Users",
            to: "/accounts/inactive_users",
          },
        ],
      },
      {
        name: "Brands",
        to: "/brands",
        icon: GlobeAltIcon,
        children: [{ name: "Brands Manager", to: "#" }],
      },
    ];
  }, []);

  return (
    <div className="no-scrollbar flex grow flex-col overflow-y-auto bg-[#1C2434] px-6 pb-4 ring-1 ring-white/10">
      <div className="flex items-center justify-center">
        <div className="flex justify-center gap-4 py-8">
          <p className="text-4xl text-white font-bold">OMS</p>
          <p className="border-none bg-[#41B2E9] font-medium text-sm text-white rounded-md self-center py-1.5 px-3">
            Admin
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
                        params={null}
                        to={item.to}
                        className={classNames(
                          isActiveGroup ? "bg-gray-50" : "",
                          "group hover:bg-gray-50 flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700"
                        )}
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
                                    params={null}
                                    to={subItem.to}
                                    className={
                                      "block py-2 pr-2 text-sm leading-6 text-[#8A99AF]"
                                    }
                                    activeProps={{ className: `text-white` }}
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
