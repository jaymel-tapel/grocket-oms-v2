import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../tools/buttons/Button";
import { useState } from "react";
import ClientFormInformation from "./ClientFormInformation";
import ClientFormCompanies from "./ClientFormCompanies";

const VIEWS = ["Client Information", "Companies"] as const;
type View = (typeof VIEWS)[number];

const clientFormSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .optional(),
  sourceId: z.coerce.number(),
  industryId: z.coerce.number(),
  thirdPartyId: z.string().optional(),
  sentOffer: z.boolean().optional(),
  default_unit_cost: z.coerce.number().optional(),
  phone: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

const ClientForm = () => {
  const [activeTab, setActiveTab] = useState<View>("Client Information");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
  });

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const onSubmit: SubmitHandler<ClientFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white shadow-sm p-8">
      <div className="p-3 inline-flex flex-wrap gap-3 border border-grGray-dark shrink-0">
        {VIEWS.map((view, index) => {
          const isActive = activeTab === view;

          return (
            <Button
              key={index}
              variant={isActive ? "default" : "inactive"}
              onClick={() => handleTabClick(view)}
            >
              {view}
            </Button>
          );
        })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {activeTab === "Client Information" && (
          <ClientFormInformation register={register} errors={errors} />
        )}

        {activeTab === "Companies" && <ClientFormCompanies />}

        <div className="pt-8 flex justify-end gap-4 border-t border-t-gray-300">
          <Button type="button" variant={"noBorder"}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
