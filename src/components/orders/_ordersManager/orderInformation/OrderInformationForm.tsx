import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../../pages/orders/ordersManager/Order";
import { Order } from "../../../../services/queries/orderQueries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../../services/queries/clientsQueries";
dayjs.extend(utc);

type OrderInformationFormProps = {
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
  order?: Order;
};

const OrderInformationForm: React.FC<OrderInformationFormProps> = ({
  control,
  errors,
  order,
}) => {
  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();

  // const labels = useMemo(() => {
  //   const industry = industries?.find(
  //     (item) => item.id === order?.client.clientInfo.industryId
  //   );
  //   const origin = origins?.find(
  //     (item) => item.id === order?.client.clientInfo.sourceId
  //   );

  //   return { industry: industry?.name ?? "", origin: origin?.name ?? "" };
  // }, [order, industries, origins]);

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-8 flex justify-between border-b border-grGray-dark">
        <div className="flex gap-2 items-center">
          <UserCircleIcon
            className="h-20 w-20 text-gray-300"
            aria-hidden="true"
          />
          <div className="text-sm flex flex-col">
            <span>{order?.client.seller.name}</span>
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
          <div className="flex gap-12">
            <div className="cursor-pointer flex gap-2 items-center text-xs text-blue-700">
              <ArrowUpTrayIcon className="h-4 w-4" />
              <span className="font-medium">Upload Invoice</span>
            </div>
            <div className="cursor-pointer flex gap-2 items-center text-xs text-green-500">
              <DocumentIcon className="h-4 w-4" />
              <span className="font-medium">Generate Invoice PDF</span>
            </div>
          </div>
        </div>

        {/* <div className="mt-4 text-sm flex gap-12">
          <div className="flex flex-col">
            <span className="font-medium">Client Origin</span>
            <div className="px-2 py-1 text-xs bg-[#3CA745] text-white rounded-md w-[10rem] flex justify-center">
              {labels.origin}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Industry</span>
            <div className="px-2 py-1 text-xs bg-[#3BA2B8] text-white rounded-md w-[10rem] flex justify-center">
              {labels.industry}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Unit Price</span>
            <div className="px-2 py-1 text-xs bg-[#13C296] text-white rounded-md w-[10rem] flex justify-center">
              {order?.unit_cost}
            </div>
          </div>
        </div> */}

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
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                        errors.client_email && "border-red-500"
                      }`}
                      {...field}
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
