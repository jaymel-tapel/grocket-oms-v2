import { z } from "zod";

export const taskDashboardSchema = z.object({
  completed: z.boolean().optional(),
  page: z.number().optional().catch(1),
  perPage: z.number().optional().catch(10),
}).parse;

export const taskSearchParams = z.object({
  orderId: z.coerce.number().optional(),
  clientEmail: z.string().optional(),
}).parse;

export const ordersSearchSchema = z.object({
  keyword: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  filter: z
    .enum([
      "order_id",
      "company",
      "payment_status",
      "review_status",
      "reviewer_name",
      "client",
      "seller",
      "remarks",
    ])
    .optional(),
  page: z.number().optional().catch(1),
  perPage: z.number().optional().catch(10),
  code: z.string().optional(),
  showDeleted: z.boolean().optional(),
}).parse;

export const newOrderSearchSchema = z.object({
  // sellerId: z.coerce.number().optional(),
  // sellerName: z.string().optional(),
  // sellerEmail: z.string().optional(),
  // clientId: z.coerce.number().optional(),
  // clientName: z.string().optional(),
  // clientEmail: z.string().optional(),
  clientData: z.boolean().optional().catch(false),
}).parse;

export const clientsSearchSchema = z.object({
  keyword: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  filter: z.enum(["id", "email", "seller"]).optional(),
  page: z.number().optional().catch(1),
  perPage: z.number().optional().catch(10),
  code: z.string().optional(),
}).parse;

export const usersSearchSchema = z.object({
  keyword: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  filter: z.enum(["id", "email"]).optional(),
  page: z.number().optional().catch(1),
  perPage: z.number().optional().catch(10),
  showInactive: z.boolean().optional().catch(false),
}).parse;
