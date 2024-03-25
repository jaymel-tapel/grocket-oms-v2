import {
  GlobeAltIcon,
  KeyIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const adminNav = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: Squares2X2Icon,
    children: [
      { name: "My Dashboard", to: "/dashboard" },
      // { name: "My Inbox", to: "/inbox" },
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
    to: "/prospects/",
    icon: MagnifyingGlassIcon,
    children: [
      { name: "Find Prospects", to: "/find-prospects" },
      { name: "My Prospects", to: "/prospects" },
      { name: "Email Templates", to: "/prospect-email-templates" },
    ],
  },
  {
    name: "Accounts",
    to: "/accounts",
    icon: KeyIcon,
    children: [
      { name: "Seller Report", to: "/accounts/sellers_report" },
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
    children: [{ name: "Brands Manager", to: "/brands/brands_manager" }],
  },
] as const;

export const accountantSellerNav = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: Squares2X2Icon,
    children: [
      { name: "My Dashboard", to: "/dashboard" },
      // { name: "My Inbox", to: "/inbox" },
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
    to: "/prospects/",
    icon: MagnifyingGlassIcon,
    children: [
      { name: "Find Prospects", to: "/find-prospects" },
      { name: "My Prospects", to: "/prospects" },
      { name: "Email Templates", to: "/prospect-email-templates" },
    ],
  },
] as const;
