import React, { useMemo, useState } from "react";
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
import toast from "react-hot-toast";

type NewCompanyError = {
  name: { error: boolean; message: string };
  url: { error: boolean; message: string };
};

type Props = {
  clientEmail?: string;
  clientId?: number;
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
  clientEmail,
  clientId,
  errors,
}) => {
  const [showNewCompanyErrors, setShowErrors] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    url: "",
  });

  console.log(companies);

  const { data, isFetching } = useGetCompanyRatings(company?.id);
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

  const handleSelectCompany = (companyName: string) => {
    const foundCompany = companies.find(
      (company) => company.name === companyName
    );
    if (!foundCompany) return;

    handleSetCompanyValues({ name: foundCompany.name, url: foundCompany.url });
  };

  const handleAddCompany = () => {
    // if (!company) return;
    if (!clientId) {
      toast.error("Please select a valid Client first");
      return;
    }

    if (newCompanyErrors.name.error || newCompanyErrors.url.error) {
      setShowErrors(true);
      return;
    }

    if (showNewCompanyErrors) {
      setShowErrors(false);
    }

    addCompany({
      payload: {
        clientId: clientId,
        name: newCompany.name,
        url: newCompany.url,
      },
      keyword: clientEmail ?? "",
    });
  };

  console.log(company);

  return (
    <div className="border-b border-grGray-dark">
      <div className="py-4">
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div className="max-sm:col-span-2">
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
                value={company?.name ?? ""}
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
                    <option value={company.name} key={index}>
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

          <div className="max-sm:col-span-2">
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
                value={company?.url ?? ""}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {isFetching && (
          <div className="my-8 flex gap-4 items-center justify-center">
            <Spinner className="h-6 w-6" />
            <span>Fetching company statistics...</span>
          </div>
        )}
        {data && !isFetching && (
          <div className="my-8 flex gap-4 lg:gap-8 flex-col lg:flex-row">
            <div className="grid grid-cols-1 lg:w-60">
              <span className="hidden lg:block"></span>
              <div className="flex gap-4">
                <span className="font-medium">Current Rating:</span>
                {data.rating}
              </div>
              <div className="flex gap-4">
                <span className="font-medium">No. of Reviews:</span>
                {data.reviews}
              </div>
            </div>

            <div>
              {data.stars.map((review, index) => (
                <StarsIcons
                  key={index}
                  showLabels={true}
                  stars={data.stars.length - index}
                  value={review}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <span className="font-medium">Client Links</span>
        <CompanyLinksTable companies={companies} keyword={clientEmail ?? ""} />
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
