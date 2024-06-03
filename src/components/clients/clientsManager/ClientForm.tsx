import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../tools/buttons/Button";
import { useEffect, useState } from "react";
import ClientFormInformation from "./ClientFormInformation";
import ClientFormCompanies from "./ClientFormCompanies";
import {
  Client,
  useCreateClient,
  useGeneratePassword,
  useSendPasswordToEmail,
  useUpdateClient,
} from "../../../services/queries/clientsQueries";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../services/queries/brandsQueries";
import ClientOrderHistory from "./ClientOrderHistory";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../tools/dialog/Dialog";
import Spinner from "../../tools/spinner/Spinner";
import {
  Seller,
  useGetAllSellers,
} from "../../../services/queries/sellerQueries";

const VIEWS = ["Client Information", "Companies", "Order History"] as const;
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
  default_unit_cost: z.coerce.number().optional().catch(0),
  phone: z.string().optional().nullable(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

type FormProps = {
  client: Client | undefined;
};

const ClientForm: React.FC<FormProps> = ({ client }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<View>("Client Information");
  const [open, setOpen] = useState(false);
  const { user } = useUserAuthContext();
  const [selectedBrand] = useAtom(brandAtom);
  const [selectedSeller, setSelectedSeller] = useState<Seller | undefined>(
    undefined
  );
  const [sellerDraft, setSellerDraft] = useState("");

  const { data: sellers } = useGetAllSellers();
  const { mutateAsync: createClient, isPending: isCreating } =
    useCreateClient();
  const { mutateAsync: updateClient, isPending: isUpdating } =
    useUpdateClient();

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
          industryId: client.clientInfo.industryId ?? 41,
          sourceId: client.clientInfo.sourceId ?? 1,
          default_unit_cost: client.clientInfo.default_unit_cost,
          phone: client.clientInfo.phone,
          thirdPartyId: client.clientInfo.thirdPartyId,
        }
      : undefined,
  });

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const handleCreateTask = () => {
    navigate({ to: "/tasks/new", search: { clientEmail: client?.email } });
  };

  const handleNewOrder = () => {
    const clientData = JSON.stringify(client);
    localStorage.setItem("client", clientData);

    navigate({
      to: "/orders/orders-manager/new",
      search: { clientData: true },
    });
  };

  const handleSellerSelect = (email: string) => {
    const seller = sellers?.find((seller) => seller.email === email);
    if (!seller) return;

    setSelectedSeller(seller);
    setSellerDraft(seller.email);
  };

  const onSubmit: SubmitHandler<ClientFormSchema> = async (data) => {
    const seller = sellers?.find((seller) => seller.email === sellerDraft);

    const sellerId =
      user?.role === "SELLER"
        ? user?.id
        : selectedSeller
        ? selectedSeller.id
        : seller?.id ?? client?.sellerId;

    if (!selectedBrand || !user || !sellerId) return;

    const response = client?.id
      ? await updateClient({
          id: client.id,
          payload: {
            ...data,
            brandId: selectedBrand.id,
            sellerId: sellerId,
            seller_email: sellerDraft,
          },
        })
      : await createClient({
          ...data,
          brandId: selectedBrand.id,
          sellerId: sellerId,
          seller_email: sellerDraft,
        });

    if (response.status === 200 || response.status === 201) {
      navigate({ to: "/clients/clients-manager" });
    }
  };

  const handleCancel = () => {
    navigate({ to: "/clients/clients-manager" });
  };

  const handleLoginToClient = () => {
    if (!window.confirm(`Login using ${client?.name}'s account?`)) return;

    const CUSTOMER_LOGIN_URL = import.meta.env.VITE_CUSTOMER_LOGIN_URL;
    const TOKEN = import.meta.env.VITE_CUSTOMER_AUTH_TOKEN;

    const encodedEmail = window.btoa(client?.email ?? "");
    const encodedToken = window.btoa(TOKEN);
    window.open(
      CUSTOMER_LOGIN_URL + `/?email=${encodedEmail}&token=${encodedToken}`
    );
  };

  useEffect(() => {
    if (client) {
      setSellerDraft(client.seller_email ?? client.seller.email);
    } else {
      setSellerDraft(user?.email ?? "");
    }
  }, [client, user]);

  return (
    <div className="bg-white shadow-sm p-8">
      <div className="lg:p-3 flex flex-col sm:flex-row gap-3 lg:border border-grGray-dark shrink-0">
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
        {activeTab === "Client Information" && (
          <ClientFormInformation
            user={user}
            activeTab={activeTab}
            register={register}
            errors={errors}
            sellers={sellers ?? []}
            sellerDraft={sellerDraft}
            role={user?.role}
            handleSellerChange={(sellerInput) => setSellerDraft(sellerInput)}
            handleSellerSelect={handleSellerSelect}
          />
        )}

        {client && activeTab === "Companies" && (
          <ClientFormCompanies
            companies={client.companies ?? []}
            clientId={client.id}
            clientEmail={client.email}
          />
        )}

        {client && activeTab === "Order History" && (
          <ClientOrderHistory clientEmail={client.email} />
        )}

        {client && (
          <div className="flex flex-col lg:flex-row gap-4 pb-8">
            <Button type="button" variant={"green"} onClick={handleCreateTask}>
              New Task
            </Button>
            <Button
              type="button"
              variant={"lightBlue"}
              onClick={handleNewOrder}
            >
              New Order
            </Button>
            <Button type="button" onClick={handleLoginToClient}>
              Login to Client
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant={"black"}>
                  Reset Password
                </Button>
              </DialogTrigger>
              <GeneratePasswordDialog clientId={client.id} setOpen={setOpen} />
            </Dialog>
          </div>
        )}

        <div className="pt-8 flex justify-between gap-4 border-t border-t-gray-300">
          <div />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"noBorder"}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? (
                <>
                  <Spinner /> Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

type DialogProps = {
  clientId: number;
  setOpen: (bool: boolean) => void;
};

const GeneratePasswordDialog: React.FC<DialogProps> = ({
  clientId,
  setOpen,
}) => {
  const {
    mutateAsync: generatePassword,
    isPending: isGenerating,
    isSuccess,
    data,
  } = useGeneratePassword();

  const { mutateAsync: sendPasswordToEmail, isPending: isSending } =
    useSendPasswordToEmail();

  const handleSendEmail = async () => {
    if (!data) return;

    const response = await sendPasswordToEmail({
      clientId,
      password: data.password_text,
    });

    if (response.status === 200) {
      setOpen(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader className="gap-2">
        <DialogTitle className="pb-2 text-center font-bold text-[1.25rem] relative before:absolute before:bottom-[0] before:ml-[25%] before:w-[50%] before:flex before:m-0-auto before:content-[''] before:border-b before:border-2 before:border-grBlue-dark">
          Generate new password for this client?
        </DialogTitle>
        <DialogDescription className="text-center">
          {data && (
            <>
              <span className="block">Temporary password:</span>
              <span className="text-2xl">{data.password_text}</span>
            </>
          )}
          {isGenerating && <Spinner className="h-10 w-10 mx-auto" />}
        </DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          {!isSuccess ? (
            <Button
              type="button"
              disabled={isGenerating}
              onClick={() => generatePassword(clientId)}
            >
              {isGenerating && <Spinner />}Generate
            </Button>
          ) : (
            <Button
              type="button"
              variant="green"
              disabled={isSending}
              onClick={handleSendEmail}
            >
              {isSending && <Spinner />}Send to Email
            </Button>
          )}
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default ClientForm;
