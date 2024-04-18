import React, { ReactNode, useMemo } from "react";
import { useOrderForm } from "../../../../context/NewOrderFormContext";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useCreateOrder } from "../../../../services/queries/orderQueries";
import {
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../../services/queries/clientsQueries";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../../services/queries/brandsQueries";

type FormProps = {
  children: ReactNode;
};

const OrderFormStep5: React.FC<FormProps> = ({ children }) => {
  const navigate = useNavigate();
  const {
    seller,
    client,
    company,
    reviews,
    orderDate,
    remarks,
    sendConfirmation,
    setOrderDate,
    setRemarks,
    setConfirmation,
  } = useOrderForm();

  const { mutateAsync: createOrder } = useCreateOrder();
  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();
  const [selectedBrand] = useAtom(brandAtom);

  const labels = useMemo(() => {
    const industry = industries?.find(
      (industry) => industry.id === client.industry
    );
    const origin = origins?.find((origin) => origin.id === client.origin);

    return { industry: industry?.name ?? "", origin: origin?.name ?? "" };
  }, [client, industries, origins]);

  const reviewsAmount = useMemo(() => {
    const reviewsWithGoogleId = reviews.filter(
      (review) => review.google_review_id !== undefined
    );

    const reviewsWithoutGoogleId = reviews.filter(
      (review) => review.google_review_id === undefined
    );

    return {
      selected: reviewsWithGoogleId.length,
      manual: reviewsWithoutGoogleId.length,
    };
  }, [reviews]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    type ReviewPayload = {
      name: string;
      status: string;
      google_review_id?: string;
    };

    const reviewsPayload = reviews.map(({ name, status, google_review_id }) => {
      const newObj: ReviewPayload = { name, status };
      if (google_review_id !== undefined) {
        newObj.google_review_id = google_review_id;
      }
      return newObj;
    });

    if (orderDate) {
      formData.append("order_date", orderDate);
    }

    if (client.third_party_id) {
      formData.append("thirdPartyId", client.third_party_id);
    }

    if (client.phone) {
      formData.append("phone", client.phone);
    }

    if (remarks) {
      formData.append("remarks", remarks);
    }

    const brandId = selectedBrand?.id ?? 1;

    formData.append("seller_email", seller.email);
    formData.append("seller_name", seller.name);
    formData.append("client_email", client.email);
    formData.append("client_name", client.name);
    formData.append("company_name", company.name);
    formData.append("company_url", company.url);
    formData.append("send_confirmation", JSON.stringify(sendConfirmation));
    formData.append("unit_cost", JSON.stringify(client.unit_cost));
    formData.append("sourceId", JSON.stringify(client.origin));
    formData.append("industryId", JSON.stringify(client.industry));
    formData.append("brandId", JSON.stringify(brandId));
    formData.append("orderReviews", JSON.stringify(reviewsPayload));

    const response = await createOrder(formData);

    if (response.status === 201) {
      navigate({ to: "/orders/orders_manager" });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid max-sm:gap-8 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Seller</span>
          <span className="font-medium text-[1.375rem]">{seller.name}</span>
          <div className="flex flex-wrap break-all gap-1.5">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-500">{seller.email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold">Client</span>
          <span className="font-medium text-[1.375rem]">{client.name}</span>
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-wrap break-all gap-1.5">
              <span className="text-gray-500 font-medium">Email:</span>
              <span className="text-gray-500">{client.email}</span>
            </div>
            <div className="flex flex-wrap break-all gap-1.5">
              <span className="text-gray-500 font-medium">Phone:</span>
              <span className="text-gray-500">{client.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold">Company</span>
          <span className="font-medium text-[1.375rem]">{company.name}</span>
          <div className="flex flex-wrap break-all gap-1.5">
            {/* <span className="text-gray-500 font-medium">URL:</span> */}
            <span className="text-gray-500">{company.url}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 p-4 grid sm:grid-cols-6 max-sm:gap-4 border border-gray-300">
        <div className="sm:col-span-4 flex flex-col gap-4">
          <div className="flex gap-1.5">
            <span className="font-medium">Client Origin:</span>
            <span className="">{labels.origin}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="font-medium">Industry:</span>
            <span className="">{labels.industry}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="font-medium">Unit Cost:</span>
            <span className="">{client.unit_cost}</span>
          </div>
        </div>

        <div className="flex sm:flex-col gap-4 sm:text-right">
          <span className="font-medium">Selected Reviews</span>
          <span>{reviewsAmount.selected}</span>
        </div>

        <div className="flex sm:flex-col gap-4 sm:text-right">
          <span className="font-medium">Manual Reviews</span>
          <span>{reviewsAmount.manual}</span>
        </div>
      </div>

      <div className="my-8 grid grid-cols-2 sm:grid-cols-6 gap-4">
        <div className="col-span-2">
          <label
            htmlFor="orderDate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Order Date
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="orderDate"
              placeholder={dayjs().format("MM-DD-YYYY")}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              defaultValue={orderDate}
              onChange={(e) =>
                setOrderDate(dayjs(e.target.value).format("MM-DD-YYYY"))
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex gap-2 mt-4 h-6 items-center">
            <input
              id="confirmationEmail"
              name="confirmationEmail"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
              checked={sendConfirmation}
              onChange={() => setConfirmation(!sendConfirmation)}
            />
            <label className="text-black text-sm">
              Send Order Confirmation Detail
            </label>
          </div>
        </div>

        <div className="max-sm:order-first col-span-2">
          <label
            htmlFor="remarks"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Remarks
          </label>
          <div className="w-full max-w-[30rem] mt-2">
            <input
              type="text"
              id="remarks"
              defaultValue={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="max-sm:mt-4 sm:text-right">
          <span className="font-bold">Total</span>
        </div>

        <div className="max-sm:mt-4 text-right pr-4">
          <span>{reviews.length}</span>
        </div>
      </div>

      {children}
    </form>
  );
};

export default OrderFormStep5;
