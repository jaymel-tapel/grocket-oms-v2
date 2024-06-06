import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/tools/buttons/Button";
import OrderInformationForm from "../../../components/orders/_ordersManager/orderInformation/OrderInformationForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderInformationCompanies from "../../../components/orders/_ordersManager/orderInformation/OrderInformationCompanies";
import OrderInformationReviews from "../../../components/orders/_ordersManager/orderInformation/OrderInformationReviews";
import { useNavigate } from "@tanstack/react-router";
import {
  useRestoreOrder,
  useGetDeletedOrder,
} from "../../../services/queries/orderQueries";
import { deletedOrderRoute } from "../../routeTree";
import Spinner from "../../../components/tools/spinner/Spinner";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import { useGetClientBySellers } from "../../../services/queries/clientsQueries";
import { useGetAllSellers } from "../../../services/queries/sellerQueries";
import { Company } from "../../../services/queries/companyQueries";
import { useGetUserProfile } from "../../../services/queries/userQueries";
import OrderLogs from "../../../components/orders/_ordersManager/orderInformation/OrderLogs";

const VIEWS = [
  "Order Information",
  "Companies",
  "Reviews",
  "Order Logs",
] as const;
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

const DeletedOrder: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserAuthContext();
  const [activeTab, setActiveTab] = useState<View>("Order Information");
  const { orderId } = deletedOrderRoute.useParams();
  const { data: order } = useGetDeletedOrder(orderId);
  // const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();
  const { mutateAsync: restoreOrder, isPending: isRestoring } =
    useRestoreOrder();

  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(
    undefined
  );
  const [newCompanies, setNewCompanies] = useState<Company[] | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderInformationSchema>({
    resolver: zodResolver(orderInformationSchema),
    values: order && {
      seller_id: order.sellerId,
      client_email: order.client ? order.client.email : "",
      client_name: order.client ? order.client.name : "",
      company_name: order.company ? order.company.name : "",
      company_url: order.company ? order.company.url : "",
      industryId: order.client ? order.client.clientInfo.industryId : 41,
      seller_name: order.seller.name,
      seller_email: order.seller_email ?? order.seller.email,
      sourceId: order.client ? order.client.clientInfo.sourceId : 1,
      unit_cost: order.unit_cost,
      phone: order.client ? order.client.clientInfo.phone ?? "" : "",
      thirdPartyId: order.client ? order.client.clientInfo.thirdPartyId : "",
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
    console.log(arg);
    return;
  };

  const handleSellerEmailSelect = (email: string) => {
    console.log(email);
    return;
  };

  const handleClientEmailSelect = (email: string) => {
    console.log(email);
    return;
  };

  const handleSetCompanyValues = (company: { name: string; url: string }) => {
    console.log(company);
    return;
  };

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const handleBack = () => {
    navigate({ to: "/orders/deleted" });
  };

  const handleRestore = async () => {
    if (!window.confirm("Restore this order?")) return;

    const response = await restoreOrder(orderId);

    if (response.status === 200) {
      handleBack();
    }
  };

  const onSubmit: SubmitHandler<OrderInformationSchema> = async () => {
    return;
  };

  useEffect(() => {
    if (order && !order.company) {
      setNewCompanies([]);
      setSelectedCompany(undefined);
      if (order?.client.companies.length > 0) {
        // setNewCompanyId(order.client.companies[0].id);
        setNewCompanies(order.client.companies);
        // setSelectedCompany(order.client.companies[0]);
      }
    } else if (order && order.company) {
      setNewCompanies(order.client.companies);
      setSelectedCompany(order.company);
    }
  }, [order]);

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
              disableEdit={true}
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
              disableEdit={true}
              clientEmail={clientEmail}
              clientId={order?.client?.id ?? undefined}
              control={control}
              company={selectedCompany}
              companies={
                newCompanies ? newCompanies : order?.client.companies ?? []
              }
              errors={errors}
              handleSetCompanyValues={handleSetCompanyValues}
            />
          )}

          {activeTab === "Reviews" && order && (
            <OrderInformationReviews
              disableEdit={true}
              reviews={order.orderReviews}
              company={selectedCompany}
            />
          )}

          {activeTab === "Order Logs" && order && (
            <OrderLogs logs={order.orderLogs} />
          )}

          <div className="mt-4 flex gap-4 flex-col md:flex-row justify-between">
            <div />
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                type="button"
                variant="green"
                onClick={handleRestore}
                disabled={isRestoring}
              >
                {isRestoring ? (
                  <>
                    <Spinner />
                    Restoring Order...
                  </>
                ) : (
                  "Restore Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeletedOrder;
