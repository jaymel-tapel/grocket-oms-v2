import React, { useMemo, useState } from "react";
import CompanyLinksTable from "../../orders/_ordersManager/orderInformation/CompanyLinksTable";
import { Button } from "../../tools/buttons/Button";
import { Company } from "../../../services/queries/companyQueries";
import { useAddClientCompany } from "../../../services/queries/clientsQueries";
import Spinner from "../../tools/spinner/Spinner";

type NewCompanyError = {
  name: { error: boolean; message: string };
  url: { error: boolean; message: string };
};

type FormProps = {
  clientId: number | undefined;
  companies: Company[];
};

const ClientFormCompanies: React.FC<FormProps> = ({ companies, clientId }) => {
  const [formState, setFormState] = useState({ name: "", url: "" });
  const [showNewCompanyErrors, setShowErrors] = useState(false);

  const { mutateAsync: addCompany, isPending } = useAddClientCompany();

  const companyLinks = useMemo(() => {
    if (!clientId) {
      return [];
    } else if (companies) {
      return companies;
    }

    return [];
  }, [companies, clientId]);

  const newCompanyErrors = useMemo(() => {
    const errors: NewCompanyError = {
      name: { error: false, message: "" },
      url: { error: false, message: "" },
    };

    if (!formState.name) {
      errors.name = { error: true, message: "Company name is required" };
    }

    if (!formState.url) {
      errors.url = { error: true, message: "URL is required" };
    }

    return errors;
  }, [formState]);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCompany = async () => {
    if (!clientId) return;

    if (newCompanyErrors.name.error || newCompanyErrors.url.error) {
      setShowErrors(true);
      return;
    }

    if (showNewCompanyErrors) {
      setShowErrors(false);
    }

    const response = await addCompany({
      ...formState,
      clientId,
    });

    if (response.status === 201) {
      setFormState({
        name: "",
        url: "",
      });
    }
  };

  return (
    <div className="border-b border-grGray-dark">
      <div>
        <span className="font-bold text-sm">Add Company</span>
        <div className="my-8 grid grid-cols-2 gap-x-12 gap-y-4">
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
                value={formState.name}
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
                value={formState.url}
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
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner /> Adding company...
              </>
            ) : (
              "Add company"
            )}
          </Button>
        </div>
      </div>

      <div className="my-8">
        <span className="font-medium text-sm block mb-4">Company Links</span>
        <CompanyLinksTable companies={companyLinks} />
      </div>
    </div>
  );
};

export default ClientFormCompanies;
