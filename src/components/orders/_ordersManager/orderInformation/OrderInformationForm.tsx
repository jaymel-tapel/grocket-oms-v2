import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../../pages/orders/ordersManager/Order";
import {
  Order,
  useUploadOrderInvoice,
} from "../../../../services/queries/orderQueries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  useGetClientBySellers,
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../../services/queries/clientsQueries";
import AutoComplete from "../../../tools/autoComplete/AutoComplete";

dayjs.extend(utc);

type OrderInformationFormProps = {
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
  order?: Order;
  debouncedEmail?: string;
  sellerId?: number;
};

const OrderInformationForm: React.FC<OrderInformationFormProps> = ({
  control,
  errors,
  order,
  debouncedEmail,
  sellerId,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();

  const { data: clients } = useGetClientBySellers({
    sellerId,
    keyword: debouncedEmail ?? "",
  });

  const { mutateAsync: uploadInvoice } = useUploadOrderInvoice();

  const handleFileChange = async (e) => {
    if (!order) return;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Get the file from the input
      setImageFile(file);
      const formData = new FormData();
      console.log(file);
      formData.append("image", file);
      await uploadInvoice({ orderId: order.id, payload: formData });
    }
  };

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-8 flex justify-between border-b border-grGray-dark">
        <div className="flex gap-2 items-center">
          <UserCircleIcon
            className="h-20 w-20 text-gray-300"
            aria-hidden="true"
          />
          <div className="text-sm flex flex-col">
            <span>{order?.seller.name}</span>
            <span>SELLER</span>
          </div>
        </div>
        <div>
          <span className="text-sm">
            {dayjs(order?.createdAt).local().format("MM-DD-YYYY")}
          </span>
        </div>
      </div>

      <div className="py-4">
        <div className="flex justify-between">
          <span className="font-medium">Client Information</span>
          <div className="flex items-center gap-12">
            {order?.invoice_image ? (
              <a
                href={order.invoice_image}
                download={order.invoice_image.split(".")[0]}
                target={"_blank"}
                rel="noreferrer"
                className="text-xs text-blue-700 font-medium"
              >
                Download Invoice
              </a>
            ) : (
              <div>
                <label
                  htmlFor="invoiceInput"
                  className="cursor-pointer flex gap-2 items-center text-xs text-blue-700 font-medium"
                >
                  {imageFile?.name ? (
                    imageFile.name
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="h-4 w-4" />
                      Upload Invoice
                    </>
                  )}
                </label>
                <input
                  id="invoiceInput"
                  type="file"
                  className="font-medium hidden"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            )}
            <div className="cursor-pointer flex gap-2 items-center text-xs text-green-500">
              <DocumentIcon className="h-4 w-4" />
              <span className="font-medium">Generate Invoice PDF</span>
            </div>
          </div>
        </div>

        <div>
          <div className="py-4 grid grid-cols-3 gap-x-12 gap-y-4">
            <div>
              <label
                htmlFor="client_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Name
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="client_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                        errors.client_name && "border-red-500"
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.client_name && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.client_name?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="client_email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Email
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="client_email"
                  control={control}
                  render={({ field: { onChange, ...fieldProps } }) => (
                    // <input
                    //   type="text"
                    //   className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                    //     errors.client_email && "border-red-500"
                    //   }`}
                    //   {...field}
                    // />
                    <AutoComplete
                      suggestions={clients?.map((client) => client.email) ?? []}
                      {...fieldProps}
                      handleChange={(value) => onChange(value)}
                    />
                  )}
                />
                {errors.client_email && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.client_email?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Phone
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                        errors.phone && "border-red-500"
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="sourceId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Origin
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="sourceId"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="origin"
                      autoComplete="off"
                      {...field}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                        errors.sourceId && "border-red-500"
                      }`}
                    >
                      <option disabled>Select Origin</option>
                      {origins?.map((origin, index) => {
                        return (
                          <option value={`${origin.id}`} key={index}>
                            {origin.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                {errors.sourceId && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.sourceId?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="industryId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Industry
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="industryId"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="industry"
                      autoComplete="off"
                      {...field}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                        errors.industryId && "border-red-500"
                      }`}
                    >
                      <option disabled>Select Origin</option>
                      {industries?.map((industry, index) => {
                        return (
                          <option value={`${industry.id}`} key={index}>
                            {industry.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                {errors.industryId && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.industryId?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="unit_cost"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Unit Cost
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="unit_cost"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                        errors.phone && "border-red-500"
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.unit_cost && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.unit_cost?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="thirdPartyId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Third Party Id
              </label>
              <div className="w-full mt-2">
                <Controller
                  name="thirdPartyId"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                        errors.thirdPartyId && "border-red-500"
                      }`}
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
                {errors.thirdPartyId && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.thirdPartyId?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformationForm;
