import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../../pages/orders/ordersManager/Order";
import {
  Order,
  useGenerateInvoicePDF,
  useUploadOrderInvoice,
} from "../../../../services/queries/orderQueries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Client,
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../../services/queries/clientsQueries";
import AutoComplete from "../../../tools/autoComplete/AutoComplete";
import Spinner from "../../../tools/spinner/Spinner";
import { Seller } from "../../../../services/queries/sellerQueries";

dayjs.extend(utc);

type OrderInformationFormProps = {
  role: string;
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
  order?: Order;
  sellers: Seller[];
  clients: Client[];
  clientEmail: string;
  sellerEmail: string;
  sellerEmails: string[];
  handleEmailChange: (arg: { isSeller: boolean; value: string }) => void;
  handleSellerEmailSelect: (email: string) => void;
  handleClientEmailSelect: (email: string) => void;
};

const OrderInformationForm: React.FC<OrderInformationFormProps> = ({
  role,
  control,
  errors,
  order,
  sellers,
  clients,
  clientEmail,
  sellerEmail,
  sellerEmails,
  handleEmailChange,
  handleSellerEmailSelect,
  handleClientEmailSelect,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();
  const { refetch: downloadInvoicePDF, isFetching } = useGenerateInvoicePDF(
    order?.id
  );

  const { mutateAsync: uploadInvoice } = useUploadOrderInvoice();

  const handleFileChange = async (e) => {
    if (!order) return;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const formData = new FormData();
      formData.append("image", file);
      await uploadInvoice({ orderId: order.id, payload: formData });
    }
  };

  const handleGenerateInvoice = async () => {
    await downloadInvoicePDF();
  };

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-8 flex flex-col gap-y-4 lg:flex-row justify-between border-b border-grGray-dark">
        <div className="order-2 lg:order-1 flex w-full gap-2 items-center">
          <UserCircleIcon
            className="hidden lg:block h-20 w-20 text-gray-300"
            aria-hidden="true"
          />
          <div className="text-sm w-full flex flex-col">
            <span className="font-medium">Seller Name</span>
            <span>{order?.seller.name}</span>
            <div>
              <div className="w-full lg:max-w-[300px] mt-2">
                <label
                  htmlFor="seller_email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Seller Email
                </label>

                {(role === "ADMIN" || role === "ACCOUNTANT") && (
                  <AutoComplete
                    suggestions={sellers?.map((seller) => seller.email) ?? []}
                    type="email"
                    value={sellerEmail}
                    handleChange={(value) =>
                      handleEmailChange({ isSeller: true, value })
                    }
                    handleSelect={(value) => handleSellerEmailSelect(value)}
                  />
                )}

                {role === "SELLER" && (
                  <select
                    id="sellerEmails"
                    autoComplete="off"
                    value={sellerEmail}
                    onChange={(e) => handleSellerEmailSelect(e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                  >
                    {sellerEmails.map((email, index) => {
                      return (
                        <option value={email} key={index}>
                          {email}
                        </option>
                      );
                    })}
                  </select>
                )}
                {errors.seller_email && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.seller_email?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-sm whitespace-nowrap">
            Order date: {dayjs(order?.createdAt).local().format("MM-DD-YYYY")}
          </span>
        </div>
      </div>

      <div className="py-4">
        <div className="flex flex-col gap-y-4 md:flex-row justify-between">
          <span className="font-medium">Client Information</span>
          <div className="flex flex-col lg:flex-row lg:items-center gap-y-8 gap-x-12">
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
            <button
              type="button"
              className="cursor-pointer flex gap-2 items-center text-xs text-green-500"
              disabled={isFetching}
              onClick={handleGenerateInvoice}
            >
              {isFetching ? (
                <>
                  <Spinner />
                  Generating Invoice...
                </>
              ) : (
                <>
                  <DocumentIcon className="h-4 w-4" />
                  <span className="font-medium">Generate Invoice PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="py-4 grid grid-cols-3 gap-x-12 gap-y-4">
            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3 lg:col-span-1">
              <label
                htmlFor="client_email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Email
              </label>
              <div className="w-full mt-2">
                <AutoComplete
                  suggestions={clients?.map((client) => client.email) ?? []}
                  type="email"
                  value={clientEmail}
                  handleChange={(value) =>
                    handleEmailChange({ isSeller: false, value })
                  }
                  handleSelect={(value) => handleClientEmailSelect(value)}
                />
                {errors.client_email && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.client_email?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3 lg:col-span-1">
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

            <div className="col-span-3">
              <span className="text-sm font-medium">Remarks</span>
              <Controller
                name="remarks"
                control={control}
                render={({ field }) => (
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
