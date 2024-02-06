import React, { useEffect, useMemo, useState } from "react";
import StarsIcons from "../../../tools/stars/StarIcons";
import { Control, FieldErrors } from "react-hook-form";
import { OrderInformationSchema } from "../../../../pages/orders/ordersManager/Order";
import {
  Company,
  useGetCompanyRatings,
} from "../../../../services/queries/companyQueries";
import Spinner from "../../../tools/spinner/Spinner";
import CompanyLinksTable from "./CompanyLinksTable";
import { Button } from "../../../tools/buttons/Button";
import { useAddClientCompany } from "../../../../services/queries/clientsQueries";

type NewCompanyError = {
  name: { error: boolean; message: string };
  url: { error: boolean; message: string };
};

type Props = {
  control: Control<OrderInformationSchema>;
  errors: FieldErrors<OrderInformationSchema>;
  companies: Company[];
  company?: Company;
  handleSetCompanyValues: (company: { name: string; url: string }) => void;
};

const OrderInformationCompanies: React.FC<Props> = ({
  company,
  companies,
  handleSetCompanyValues,
  errors,
}) => {
  const [showNewCompanyErrors, setShowErrors] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    url: "",
  });

  const { ratings, getGoogleRatings, isFetchingRatings } =
    useGetCompanyRatings();
  const { mutateAsync: addCompany, isPending: isAddingCompany } =
    useAddClientCompany();

  const newCompanyErrors = useMemo(() => {
    const errors: NewCompanyError = {
      name: { error: false, message: "" },
      url: { error: false, message: "" },
    };

    if (!newCompany.name) {
      errors.name = { error: true, message: "Company name is required" };
    }

    if (!newCompany.url) {
      errors.url = { error: true, message: "URL is required" };
    }

    return errors;
  }, [newCompany]);

  const handleChange = (field: keyof typeof newCompany, value: string) => {
    setNewCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectCompany = (companyId: string) => {
    const foundCompany = companies.find(
      (company) => company.id === Number(companyId)
    );
    if (!foundCompany) return;

    handleSetCompanyValues({ name: foundCompany.name, url: foundCompany.url });
  };

  const handleAddCompany = () => {
    if (!company) return;
    console.log(company);

    if (newCompanyErrors.name.error || newCompanyErrors.url.error) {
      setShowErrors(true);
      return;
    }

    if (showNewCompanyErrors) {
      setShowErrors(false);
    }

    addCompany({
      clientId: company.clientId,
      name: newCompany.name,
      url: newCompany.url,
    });
  };

  useEffect(() => {
    if (company) {
      getGoogleRatings({ url: company.url });
    }
    //eslint-disable-next-line
  }, [company]);

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-4">
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company
            </label>
            <div className="mt-2">
              <select
                id="company"
                autoComplete="off"
                value={company?.name}
                onChange={(e) => handleSelectCompany(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.company_name && "border-red-500"
                }`}
              >
                <option disabled value="">
                  Select Company
                </option>
                {companies?.map((company, index) => {
                  return (
                    <option value={company.id} key={index}>
                      {company.name}
                    </option>
                  );
                })}
              </select>
              {errors.company_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.company_name?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="company_url"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company URL
            </label>
            <div className="w-full mt-2">
              <input
                disabled
                type="text"
                id="company_url"
                value={company?.url}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {isFetchingRatings && (
          <div className="my-8 flex gap-4 items-center justify-center">
            <Spinner className="h-6 w-6" />
            <span>Fetching company statistics...</span>
          </div>
        )}
        {ratings && !isFetchingRatings && (
          <div className="my-8 flex gap-4 lg:gap-8 flex-col lg:flex-row">
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

      <div className="flex flex-col gap-4">
        <span className="font-medium">Client Links</span>
        <CompanyLinksTable companies={companies} />
      </div>

      <div className="my-8">
        <span className="font-medium">Add New Company</span>
        <div className="my-4 grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="new_company_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="new_company_name"
                value={newCompany.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  newCompanyErrors.name && "border-red-500"
                }`}
              />
              {showNewCompanyErrors && newCompanyErrors.name.error && (
                <p className="text-xs italic text-red-500 mt-2">
                  {newCompanyErrors.name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="new_company_url"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              URL
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="new_company_url"
                value={newCompany.url}
                onChange={(e) => handleChange("url", e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  newCompanyErrors.url && "border-red-500"
                }`}
              />
              {showNewCompanyErrors && newCompanyErrors.url.error && (
                <p className="text-xs italic text-red-500 mt-2">
                  {newCompanyErrors.url.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleAddCompany}
            variant="black"
            disabled={isAddingCompany}
          >
            {isAddingCompany ? (
              <>
                <Spinner /> Adding Company...
              </>
            ) : (
              "Add Company"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderInformationCompanies;
