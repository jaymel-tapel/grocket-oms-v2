import React, { useEffect } from "react";
import StarsIcons from "../../../tools/stars/StarIcons";
import { Control, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../../pages/orders/ordersManager/Order";
import {
  Company,
  useGetCompanyRatings,
} from "../../../../services/queries/companyQueries";
import Spinner from "../../../tools/spinner/Spinner";

type Props = {
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
  companies: Company[];
  company?: Company;
};

const OrderInformationCompanies: React.FC<Props> = ({ company }) => {
  const { ratings, getGoogleRatings, isFetchingRatings } =
    useGetCompanyRatings();

  useEffect(() => {
    if (company) {
      getGoogleRatings({ url: company.url });
    }
    //eslint-disable-next-line
  }, [company]);

  return (
    <div className="border-b border-grGray-dark">
      {/* <div className="my-8 flex gap-2 items-center">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company
          </label>
          <div className="mt-2">
            <Controller
              name="client_name"
              control={control}
              render={({ field }) => (
                <select
                  id="company"
                  autoComplete="off"
                  {...field}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    errors.company_name && "border-red-500"
                  }`}
                >
                  <option disabled value="">
                    Select Company
                  </option>
                  {companies?.map((company, index) => {
                    return (
                      <option value={company.name} key={index}>
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              )}
            />
            {errors.company_name && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.company_name?.message}
              </p>
            )}
          </div>
        </div>
      </div> */}

      <div className="py-4">
        <span className="font-medium">Company</span>
        <div className="flex flex-col">
          <span>{company?.name}</span>
          <span>{company?.url}</span>
        </div>
        {isFetchingRatings && (
          <div className="mt-4 flex gap-4 items-center justify-center">
            <Spinner className="h-6 w-6" />
            <span>Fetching company statistics...</span>
          </div>
        )}
        {ratings && !isFetchingRatings && (
          <div className="mt-4 flex gap-4 lg:gap-8 flex-col lg:flex-row">
            <div className="grid grid-cols-1 lg:w-60">
              <span>{ratings.address}</span>
              <div className="flex gap-4">
                <span className="font-medium">Current Rating:</span>
                {ratings.rating}
              </div>
              <div className="flex gap-4">
                <span className="font-medium">No. of Reviews:</span>
                {ratings.totalReviews}
              </div>
            </div>

            <div>
              {ratings.ratingCount.map((review, index) => (
                <StarsIcons
                  key={index}
                  showLabels={true}
                  stars={ratings.ratingCount.length - index}
                  value={review}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* <div className="py-4 flex flex-col">
        <span className="font-medium">Client Links</span>
        <CompanyLinksTable companies={} />
      </div> */}
    </div>
  );
};

export default OrderInformationCompanies;
