import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../pages/orders/OrderInformation";

type OrderInformationFormProps = {
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
};

const OrderInformationForm: React.FC<OrderInformationFormProps> = ({
  control,
  errors,
}) => {
  console.log(errors);

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-8 flex justify-between border-b border-grGray-dark">
        <div className="flex gap-2 items-center">
          <UserCircleIcon
            className="h-20 w-20 text-gray-300"
            aria-hidden="true"
          />
          <div className="text-sm flex flex-col">
            <span>John P. Doe</span>
            <span>SELLER</span>
          </div>
        </div>
        <div>
          <span className="text-sm">11/27/2023</span>
        </div>
      </div>

      <div className="py-4">
        <div className="flex justify-between">
          <span className="font-medium">Client Information</span>
          <div className="flex gap-12">
            <div className="flex gap-2 items-center text-xs text-blue-700">
              <ArrowUpTrayIcon className="h-4 w-4" />
              <span className="font-medium">Upload Invoice</span>
            </div>
            <div className="flex gap-2 items-center text-xs text-green-500">
              <DocumentIcon className="h-4 w-4" />
              <span className="font-medium">Generate Invoice PDF</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm flex gap-12">
          <div className="flex flex-col">
            <span className="font-medium">Client Origin</span>
            <div className="px-2 py-1 text-xs bg-[#3CA745] text-white rounded-md w-[10rem] flex justify-center">
              New Customer
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Industry</span>
            <div className="px-2 py-1 text-xs bg-[#3BA2B8] text-white rounded-md w-[10rem] flex justify-center">
              Bar
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Unit Price</span>
            <div className="px-2 py-1 text-xs bg-[#13C296] text-white rounded-md w-[10rem] flex justify-center">
              10
            </div>
          </div>
        </div>

        <div>
          <div className="py-4 grid grid-cols-3 gap-x-12">
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Client Name
              </label>
              <Controller
                name="client_name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-sm w-full"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Client Email
              </label>
              <Controller
                name="client_email"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-sm w-full"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Client Phone
              </label>
              <Controller
                name="client_phone"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-sm w-full"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                3rd Party Id
              </label>
              <Controller
                name="third_party_id"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-sm w-full"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformationForm;
