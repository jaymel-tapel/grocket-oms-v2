import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../tools/buttons/Button";
import { useState } from "react";
import ClientFormInformation from "./ClientFormInformation";
import ClientFormCompanies from "./ClientFormCompanies";
import {
  Client,
  useCreateClient,
  useUpdateClient,
} from "../../../services/queries/clientsQueries";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../services/queries/brandsQueries";
import { UserLocalInfo, getUserInfo } from "../../../utils/utils";
import {
  Seller,
  useGetAllSellers,
} from "../../../services/queries/sellerQueries";
import toast from "react-hot-toast";
import AutoComplete from "../../tools/autoComplete/AutoComplete";

const VIEWS = ["Client Information", "Companies"] as const;
type View = (typeof VIEWS)[number];

const clientFormSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .optional(),
  sourceId: z.coerce.number().catch(1),
  industryId: z.coerce.number().catch(41),
  thirdPartyId: z.string().optional().nullable(),
  sentOffer: z.boolean().optional(),
  default_unit_cost: z.coerce.number().optional().catch(10),
  phone: z.string().optional().nullable(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

type FormProps = {
  client: Client | undefined;
};

const ClientForm: React.FC<FormProps> = ({ client }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<View>("Client Information");

  const user = getUserInfo() as UserLocalInfo;
  const [selectedBrand] = useAtom(brandAtom);
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [emailDraft, setEmailDraft] = useState("");

  const { data: sellers } = useGetAllSellers();
  const { mutateAsync: createClient } = useCreateClient();
  const { mutateAsync: updateClient } = useUpdateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    values: client
      ? {
          name: client.name,
          email: client.email,
          industryId: client.clientInfo.industryId,
          sourceId: client.clientInfo.sourceId,
          default_unit_cost: client.clientInfo.default_unit_cost,
          phone: client.clientInfo.phone,
          thirdPartyId: client.clientInfo.thirdPartyId,
        }
      : undefined,
  });

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const handleEmailSelect = (email: string) => {
    const foundSeller = sellers?.data.find((seller) => seller.email === email);
    if (!foundSeller) return;
    setEmailDraft(email);
    setSeller(foundSeller);
  };

  const handleChange = (email: string) => {
    setEmailDraft(email);
    const foundSeller = sellers?.data.find((seller) => seller.email === email);
    if (!foundSeller) return;
    setSeller(foundSeller);
  };

  const onSubmit: SubmitHandler<ClientFormSchema> = async (data) => {
    if (!selectedBrand) return;

    let sellerId: number;

    if (user.role === "SELLER") {
      sellerId = user.id;
    } else {
      if (!seller) {
        toast.error("Please select a seller");
        return;
      }
      sellerId = seller.id;
    }

    const response = client?.id
      ? await updateClient({
          id: client.id,
          payload: { ...data, brandId: selectedBrand.id, sellerId },
        })
      : await createClient({ ...data, brandId: selectedBrand.id, sellerId });

    if (response.status === 200 || response.status === 201) {
      navigate({ to: "/clients/clients_manager" });
    }
  };

  return (
    <div className="bg-white shadow-sm p-8">
      <div className="p-3 inline-flex flex-wrap gap-3 border border-grGray-dark shrink-0">
        {VIEWS.map((view, index) => {
          const isActive = activeTab === view;
          if (!client?.id && index === 1) return;

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
        {activeTab === "Client Information" && user.role !== "SELLER" && (
          <div className="mb-8 grid grid-cols-2 gap-12">
            <div>
              <label
                htmlFor="sellerEmail"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Seller Email
              </label>
              <AutoComplete
                suggestions={sellers?.data.map((seller) => seller.email) ?? []}
                type="email"
                value={emailDraft}
                handleChange={(value) => handleChange(value)}
                handleSelect={(value) => handleEmailSelect(value)}
              />
            </div>
          </div>
        )}
        {activeTab === "Client Information" && (
          <ClientFormInformation register={register} errors={errors} />
        )}

        {client && activeTab === "Companies" && (
          <ClientFormCompanies
            companies={client.companies ?? []}
            clientId={client.id}
          />
        )}

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
