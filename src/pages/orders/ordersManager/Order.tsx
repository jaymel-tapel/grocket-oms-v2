import React, { useMemo, useState } from "react";
import { Button } from "../../../components/tools/buttons/Button";
import OrderInformationForm from "../../../components/orders/_ordersManager/orderInformation/OrderInformationForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@heroicons/react/20/solid";
import OrderInformationCompanies from "../../../components/orders/_ordersManager/orderInformation/OrderInformationCompanies";
import OrderInformationReviews from "../../../components/orders/_ordersManager/orderInformation/OrderInformationReviews";
import { useNavigate } from "@tanstack/react-router";
import {
  useDeleteOrder,
  useGetOrder,
  useUpdateOrder,
} from "../../../services/queries/orderQueries";
import { orderRoute } from "../../routeTree";
import Spinner from "../../../components/tools/spinner/Spinner";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import { useGetClientBySellers } from "../../../services/queries/clientsQueries";
import { useGetAllSellers } from "../../../services/queries/sellerQueries";
import { Company } from "../../../services/queries/companyQueries";
import { useGetUserProfile } from "../../../services/queries/userQueries";

const VIEWS = ["Order Information", "Companies", "Reviews"] as const;
type View = (typeof VIEWS)[number];

const orderInformationSchema = z.object({
  seller_id: z.number(),
  seller_name: z.string(),
  seller_email: z.string().email().min(1, { message: "Invalid Email Address" }),
  client_name: z.string(),
  client_email: z.string().email().min(1, { message: "Invalid Email Address" }),
  phone: z.string().optional().catch(""),
  thirdPartyId: z.string().optional().nullable(),
  sourceId: z.coerce.number().min(1).catch(1),
  industryId: z.coerce.number().min(1).catch(41),
  unit_cost: z.coerce.number().catch(0),
  company_name: z.string(),
  company_url: z.string(),
  remarks: z.string().optional().catch(""),
});

export type OrderInformationSchema = z.infer<typeof orderInformationSchema>;

const Order: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserAuthContext();
  const [activeTab, setActiveTab] = useState<View>("Order Information");
  const { orderId } = orderRoute.useParams();
  const { data: order } = useGetOrder(orderId);
  const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();
  const { mutateAsync: deleteOrder, isPending: isDeleting } = useDeleteOrder();

  const [newCompanyId, setNewCompanyId] = useState<number | null>(null);
  const [newCompanies, setNewCompanies] = useState<Company[] | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OrderInformationSchema>({
    resolver: zodResolver(orderInformationSchema),
    values: order && {
      seller_id: order.sellerId,
      client_email: order.client.email,
      client_name: order.client.name,
      company_name: order.company.name,
      company_url: order.company.url,
      industryId: order.client.clientInfo.industryId,
      seller_name: order.seller.name,
      seller_email: order.seller_email ?? order.seller.email,
      sourceId: order.client.clientInfo.sourceId,
      unit_cost: order.unit_cost,
      phone: order.client.clientInfo.phone ?? "",
      thirdPartyId: order.client.clientInfo.thirdPartyId,
      remarks: order.remarks ?? "",
    },
  });

  const clientEmail = watch("client_email");
  const sellerEmail = watch("seller_email");

  const { data: sellers } = useGetAllSellers();
  const { data: clients } = useGetClientBySellers({
    // sellerId: seller.id,
    // keyword: debouncedClientEmail ?? "",
  });

  const { data: userProfile } = useGetUserProfile();

  const sellerEmails = useMemo(() => {
    if (!userProfile?.alternateEmails) return [];

    return [
      userProfile.email,
      ...userProfile.alternateEmails.map((item) => item.email),
    ];
  }, [userProfile]);

  const handleEmailChange = (arg: { isSeller: boolean; value: string }) => {
    if (arg.isSeller) {
      setValue("seller_email", arg.value);
    } else {
      setValue("client_email", arg.value);
    }
  };

  const manualSubmit = async () => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleSellerEmailSelect = (email: string) => {
    if (user?.role === "SELLER") {
      setValue("seller_email", email);
    } else {
      const seller = sellers?.find((seller) => seller.email === email);
      if (!seller) return;

      setValue("seller_email", seller.email);
      setValue("seller_name", seller.name);
      setValue("seller_id", seller.id);
    }
  };

  const handleClientEmailSelect = (email: string) => {
    const client = clients?.find((client) => client.email === email);
    if (!client) return;

    setValue("client_name", client.name);
    setValue("client_email", client.email);
    setValue("industryId", client.clientInfo.industryId ?? 41);
    setValue("sourceId", client.clientInfo.sourceId ?? 1);
    setValue("phone", client.clientInfo.phone ?? "");
    setValue("unit_cost", client.clientInfo.default_unit_cost ?? 10);
    setValue("thirdPartyId", client.clientInfo.thirdPartyId ?? "");

    setNewCompanies(client.companies);
    setNewCompanyId(client.companies[0].id);
    setValue("company_name", client.companies[0].name);
    setValue("company_url", client.companies[0].url);

    manualSubmit();
  };

  const handleSetCompanyValues = (company: { name: string; url: string }) => {
    setValue("company_name", company.name);
    setValue("company_url", company.url);
  };

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const handleBack = () => {
    navigate({ to: "/orders/orders_manager" });
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this order?")) return;

    deleteOrder(orderId);
    handleBack();
  };

  const handleCreateTask = () => {
    navigate({
      to: "/tasks/new",
      search: {
        orderId: order?.id,
        clientEmail: order?.client?.email,
      },
    });
  };

  const onSubmit: SubmitHandler<OrderInformationSchema> = async (data) => {
    if (!order) return;

    const response = await updateOrder({
      payload: {
        ...data,
        companyId: newCompanyId ? newCompanyId : order.companyId,
        brandId: order.brandId,
      },
      orderId,
    });

    if (response.status === 200) {
      handleBack();
    }
  };

  return (
    <div>
      <span
        className="text-grBlue-light font-medium cursor-pointer"
        onClick={handleBack}
      >
        Back
      </span>

      <div className="mt-10 p-4 sm:p-10 pt-6 bg-white shadow-md">
        <div className="lg:p-3 flex flex-col sm:flex-row gap-3 lg:border border-grGray-dark shrink-0">
          {VIEWS.map((view, index) => {
            const isActive = activeTab === view;

            return (
              <Button
                key={index}
                variant={isActive ? "default" : "inactive"}
                onClick={() => handleTabClick(view)}
                className=""
              >
                {view}
              </Button>
            );
          })}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === "Order Information" && (
            <OrderInformationForm
              role={user?.role ?? "SELLER"}
              control={control}
              errors={errors}
              order={order}
              sellers={sellers ?? []}
              clients={clients ?? []}
              clientEmail={clientEmail}
              sellerEmail={sellerEmail}
              sellerEmails={sellerEmails}
              handleSellerEmailSelect={handleSellerEmailSelect}
              handleClientEmailSelect={handleClientEmailSelect}
              handleEmailChange={handleEmailChange}
            />
          )}

          {activeTab === "Companies" && (
            <OrderInformationCompanies
              clientEmail={clientEmail}
              control={control}
              company={
                newCompanies
                  ? newCompanies[0]
                  : order && "company" in order
                  ? order.company
                  : undefined
              }
              companies={
                newCompanies ? newCompanies : order?.client.companies ?? []
              }
              errors={errors}
              handleSetCompanyValues={handleSetCompanyValues}
            />
          )}

          {activeTab === "Reviews" && order && (
            <OrderInformationReviews
              reviews={order.orderReviews}
              company={order.company}
            />
          )}

          <div className="mt-4 flex gap-4 flex-col md:flex-row justify-between">
            <Button
              type="button"
              variant="delete"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Spinner />
                  Deleting
                </>
              ) : (
                "Delete"
              )}
            </Button>
            <div className="flex flex-col md:flex-row gap-4">
              {user?.role !== "ADMIN" && (
                <Button
                  type="button"
                  variant="green"
                  onClick={handleCreateTask}
                >
                  <PlusIcon className="w-3 h-3 mr-1" /> Create Task
                </Button>
              )}
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Spinner />
                    Updating
                  </>
                ) : (
                  "Update Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
