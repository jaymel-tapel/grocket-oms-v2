import React, { useState } from "react";
import { Button } from "../../components/tools/buttons/Button";
import OrderInformationForm from "../../components/orders/orderInformation/OrderInformationForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@heroicons/react/20/solid";

const VIEWS = ["Order Information", "Companies", "Reviews"] as const;
type View = (typeof VIEWS)[number];

const orderInformationSchema = z.object({
  client_name: z.string(),
  client_email: z.string(),
  client_phone: z.string(),
  third_party_id: z.string(),
});

export type OrderInformationSchema = z.infer<typeof orderInformationSchema>;

const OrderInformation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<View>("Order Information");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInformationSchema>({
    resolver: zodResolver(orderInformationSchema),
  });

  const handleTabClick = (view: View) => {
    setActiveTab(view);
  };

  const onSubmit: SubmitHandler<OrderInformationSchema> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <span>Back</span>

      <div className="p-8 bg-white shadow-md">
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
            <OrderInformationForm control={control} errors={errors} />
          )}

          <div className="mt-4 flex justify-between">
            <Button type="button" variant="delete">
              Delete
            </Button>
            <div className="flex gap-4">
              <Button type="button">
                <PlusIcon className="w-3 h-3 mr-1" /> Create Task
              </Button>
              <Button type="submit" variant="submit">
                Update Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderInformation;
