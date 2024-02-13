export const usersRouteFilters = ["id", "email"];
export const usersFilters = ["id", "email"] as const;
export type UsersFiltersType = "id" | "email";

export const clientsRouteFilters = ["id", "email", "seller"];
export const clientsFilters = ["id", "email", "seller"] as const;
export type ClientsFiltersType = "id" | "email" | "seller";

export const ordersRouteFilters = [
  "order_id",
  "company",
  "payment_status",
  "review_status",
  "reviewer_name",
  "client",
  "seller",
  "remarks",
];
export const ordersFilters = [
  "order_id",
  "company",
  "payment_status",
  "review_status",
  "reviewer_name",
  "client",
  "seller",
  "remarks",
] as const;
export type OrdersFiltersType =
  | "order_id"
  | "company"
  | "payment_status"
  | "review_status"
  | "reviewer_name"
  | "client"
  | "seller"
  | "remarks";
