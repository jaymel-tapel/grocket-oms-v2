export const usersRouteFilters = ["id", "email"];
export const usersFilters = ["id", "email"] as const;
export type UsersFiltersType = "id" | "email";

export const clientsRouteFilters = ["seller"];
export const clientsFilters = ["seller"] as const;
export type ClientsFiltersType = "seller";

export const ordersRouteFilters = [
  "order_id",
  "company",
  "payment_status",
  "review_status",
  "reviewer_name",
  "seller",
  "client",
  "remarks",
];
export const ordersFilters = [
  "order_id",
  "company",
  "payment_status",
  "review_status",
  "reviewer_name",
  "seller",
  "client",
  "remarks",
] as const;
export const ordersFiltersSeller = [
  "order_id",
  "company",
  "payment_status",
  "review_status",
  "reviewer_name",
  // "seller",
  "client",
  "remarks",
] as const;
export type OrdersFiltersType =
  | "order_id"
  | "company"
  | "payment_status"
  | "review_status"
  | "reviewer_name"
  | "seller"
  | "client"
  | "remarks";
