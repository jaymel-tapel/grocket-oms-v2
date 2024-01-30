import React, { ReactNode, useMemo, useState } from "react";
import { useOrderForm } from "./NewOrderFormContext";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useCreateOrder } from "../../../../services/queries/orderQueries";

type FormProps = {
  children: ReactNode;
};

const OrderFormStep5: React.FC<FormProps> = ({ children }) => {
  const navigate = useNavigate();
  const { seller, client, company, reviews, orderDate, setOrderDate } =
    useOrderForm();
  const [remarks, setRemarks] = useState("");
  const [isConfirmationEmail, setIsConfirmation] = useState(true);

  const { mutateAsync: createOrder } = useCreateOrder();

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
      status: number;
      google_review_id?: string;
    };

    const reviewsPayload = reviews.map(({ name, status, google_review_id }) => {
      const newObj: ReviewPayload = { name, status };
      if (google_review_id !== undefined) {
        newObj.google_review_id = google_review_id;
      }
      return newObj;
    });

    console.log(reviewsPayload);

    if (orderDate) {
      formData.append("order_date", orderDate);
    }

    if (client.third_party_id) {
      formData.append("thirdPartyId", client.third_party_id);
    }

    if (client.phone) {
      formData.append("thirdPartyId", client.phone);
    }

    formData.append("seller_email", seller.email);
    formData.append("seller_name", seller.name);
    formData.append("client_email", client.email);
    formData.append("client_name", client.name);
    formData.append("company_name", company.name);
    formData.append("company_url", company.url);
    formData.append("unit_cost", JSON.stringify(client.unit_cost));
    formData.append("sourceId", JSON.stringify(client.origin));
    formData.append("industryId", JSON.stringify(client.industry));
    formData.append("brandId", JSON.stringify(1));
    formData.append("orderReviews", JSON.stringify(reviewsPayload));

    await createOrder(formData);

    // const payload = {
    //   seller: {
    //     name: seller.name,
    //     email: seller.email,
    //   },
    //   client,
    //   company,
    //   reviews,
    // };

    // console.log(payload);
    // navigate({ to: "/orders/orders_manager" });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          id="dateTo"
          placeholder={dayjs().format("MM-DD-YYYY")}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          defaultValue={orderDate}
          onChange={(e) =>
            setOrderDate(dayjs(e.target.value).format("MM-DD-YYYY"))
          }
          className="ml-auto block w-full max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Seller</span>
          <span className="font-medium text-[1.375rem]">{seller.name}</span>
          <div className="flex gap-1.5">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-500">{seller.email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold">Client</span>
          <span className="font-medium text-[1.375rem]">{client.name}</span>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1.5">
              <span className="text-gray-500 font-medium">Email:</span>
              <span className="text-gray-500">{client.email}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="text-gray-500 font-medium">Phone:</span>
              <span className="text-gray-500">{client.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold">Company</span>
          <span className="font-medium text-[1.375rem]">{company.name}</span>
          <div className="flex gap-1.5">
            <span className="text-gray-500 font-medium">URL:</span>
            <span className="text-gray-500">{company.url}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 p-4 grid grid-cols-6 border border-gray-300">
        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex gap-1.5">
            <span className="font-medium">Client Origin:</span>
            <span className="">{client.origin}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="font-medium">Industry:</span>
            <span className="">{client.industry}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="font-medium">Unit Cost:</span>
            <span className="">{client.unit_cost}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-right">
          <span className="font-medium">Selected Reviews</span>
          <span>{reviewsAmount.selected}</span>
        </div>

        <div className="flex flex-col gap-4 text-right">
          <span className="font-medium">Manual Reviews</span>
          <span>{reviewsAmount.manual}</span>
        </div>
      </div>

      <div className="my-8 grid grid-cols-6">
        <div className="col-span-4">
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
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex gap-2 mt-4 h-6 items-center">
            <input
              id="confirmationEmail"
              name="confirmationEmail"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
              checked={isConfirmationEmail}
              onChange={() => setIsConfirmation(!isConfirmationEmail)}
            />
            <label className="text-black text-sm">
              Send Order Confirmation Detail
            </label>
          </div>
        </div>

        <div className="text-right">
          <span className="font-bold">Total</span>
        </div>

        <div className="text-right pr-4">
          <span>{reviews.length}</span>
        </div>
      </div>

      {children}
    </form>
  );
};

export default OrderFormStep5;
