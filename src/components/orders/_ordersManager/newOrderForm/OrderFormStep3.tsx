import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  OrderFormContext,
  useOrderForm,
} from "../../../../context/NewOrderFormContext";
import { ReactNode, useEffect, useMemo, useState } from "react";
import CompanyLinksTable from "../orderInformation/CompanyLinksTable";
import { Button } from "../../../tools/buttons/Button";
import {
  useAddClientCompany,
  useGetClientBySellers,
} from "../../../../services/queries/clientsQueries";
import Spinner from "../../../tools/spinner/Spinner";

const selectCompanySchema = z.object({
  name: z.string(),
  url: z.string(),
});

type SelectCompanySchema = z.infer<typeof selectCompanySchema>;

type NewCompanyError = {
  name: { error: boolean; message: string };
  url: { error: boolean; message: string };
};

type FormProps = {
  children: ReactNode;
};

const OrderFormStep3: React.FC<FormProps> = ({ children }) => {
  const { client, setStep, company, setCompany, companies, setCompanies } =
    useOrderForm() as OrderFormContext;

  const { data: clients } = useGetClientBySellers({
    // keyword: client.email ?? "",
  });

  const { mutateAsync: addCompany, isPending: isAddingCompany } =
    useAddClientCompany();

  const companyLinks = useMemo(() => {
    if (!client.id && company.name) {
      return [company];
    } else if (companies) {
      return companies;
    }
    return [];
  }, [companies, client.id, company]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SelectCompanySchema>({
    resolver: zodResolver(selectCompanySchema),
  });

  const handleSelectCompany = (companyName: string) => {
    const foundCompany = companyLinks.find((comp) => comp.name === companyName);
    if (!foundCompany) return;

    setValue("url", foundCompany.url);
    setCompany({ name: foundCompany.name, url: foundCompany.url });
  };

  const onSubmit: SubmitHandler<SelectCompanySchema> = () => {
    setStep(4);
  };

  // -- Add new company section

  const [newCompany, setNewCompany] = useState({
    name: "",
    url: "",
  });

  const [showNewCompanyErrors, setShowErrors] = useState(false);

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

  const validateNewCompany = () => {
    const hasError = newCompanyErrors.name.error || newCompanyErrors.url.error;
    setShowErrors(hasError);

    // Invert the error flag to indicate whether data is valid
    return !hasError;
  };

  const refreshClientCompanies = () => {
    const foundClient = clients?.find((_client) => _client.id === client.id);
    if (!foundClient) return;

    setCompanies(foundClient.companies);
  };

  // Function to add the company locally when there's no client ID
  const addCompanyLocally = () => {
    setCompany(newCompany);
    setValue("name", newCompany.name);
    setValue("url", newCompany.url);
    setNewCompany({ name: "", url: "" });
  };

  const addCompanyToClient = async () => {
    const response = await addCompany({
      payload: {
        clientId: client.id as number,
        name: newCompany.name,
        url: newCompany.url,
      },
      keyword: client.email,
    });

    if (response.status === 201) {
      setCompanies([...companies, response.data]);
      setNewCompany({ name: "", url: "" });
    }
  };

  const handleAddCompany = () => {
    if (!validateNewCompany()) {
      return;
    }

    if (client.id) {
      addCompanyToClient();
    } else {
      addCompanyLocally();
    }
  };

  const handleDeleteLocal = (index: number) => {
    const filteredCompanies = companyLinks.filter(
      (_, companyIndex) => index !== companyIndex
    );
    setValue("name", "");
    setValue("url", "");
    setCompany({ name: "", url: "" });
    setCompanies(filteredCompanies);
  };

  useEffect(() => {
    if (clients) {
      refreshClientCompanies();
    }
    //eslint-disable-next-line
  }, [clients]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-8 grid grid-cols-2 gap-x-12 gap-y-4">
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
              value={company.name}
              {...register("name", {
                onChange: (e) => handleSelectCompany(e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.name && "border-red-500"
              }`}
            >
              <option disabled value="">
                Select Company
              </option>
              {companyLinks?.map((company, index) => {
                return (
                  <option value={company.name} key={index}>
                    {company.name}
                  </option>
                );
              })}
            </select>
            {errors.name && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.name?.message}
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
              value={company.url}
              {...register("url")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div>
        <span className="font-medium text-sm block mb-4">Company Links</span>
        <CompanyLinksTable
          companies={companyLinks}
          handleDeleteLocal={handleDeleteLocal}
          keyword={client.email}
        />
      </div>

      <div className="my-8">
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
              "Add"
            )}
          </Button>
        </div>
      </div>
      {children}
    </form>
  );
};

export default OrderFormStep3;
