import { z } from "zod";

const clientFormSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .optional(),
  sourceId: z.number(),
  industryId: z.number(),
  thirdPartyId: z.string().optional(),
  sentOffer: z.boolean().optional(),
  default_unit_cost: z.number().optional(),
  phone: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

const ClientForm = () => {
  return <div>ClientForm</div>;
};

export default ClientForm;
