import React, { useState } from "react";
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
import { useDebounce } from "../../../hooks/useDebounce";
import { useUserAuthContext } from "../../../context/UserAuthContext";

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
  unit_cost: z.coerce.number().min(1).catch(10),
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

  const {
    control,
    handleSubmit,
    setValue,
    watch,
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
      seller_email: order.seller.email,
      sourceId: order.client.clientInfo.sourceId,
      unit_cost: order.unit_cost,
      phone: order.client.clientInfo.phone ?? "",
      thirdPartyId: order.client.clientInfo.thirdPartyId,
      remarks: order.remarks ?? "",
    },
  });

  const clientEmail = watch("client_email");
  const debouncedClientEmail = useDebounce(clientEmail, 500);
  const sellerEmail = watch("seller_email");
  const debouncedSellerEmail = useDebounce(sellerEmail, 500);

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
      payload: { ...data, companyId: order.companyId, brandId: order.brandId },
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

      <div className="mt-10 p-10 pt-6 bg-white shadow-md">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === "Order Information" && (
            <OrderInformationForm
              control={control}
              errors={errors}
              order={order}
              debouncedClientEmail={debouncedClientEmail}
              debouncedSellerEmail={debouncedSellerEmail}
            />
          )}

          {activeTab === "Companies" && (
            <OrderInformationCompanies
              control={control}
              company={order && "company" in order ? order.company : undefined}
              companies={order?.client.companies ?? []}
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
