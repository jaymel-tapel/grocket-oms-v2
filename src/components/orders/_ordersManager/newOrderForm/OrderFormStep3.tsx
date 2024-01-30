import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormContext, useOrderForm } from "./NewOrderFormContext";
import { ReactNode, useMemo, useState } from "react";
import CompanyLinksTable from "../../orderInformation/CompanyLinksTable";
import { Button } from "../../../tools/buttons/Button";

const companyLinks = [
  {
    _id: "1359",
    name: "RECHTSANWALT DR. DR. IRANBOMY ",
    valid_url: 1,
    url: "https://g.page/Rechtsanwalt-Iranbomy?share",
    client_id: 1696,
  },
  {
    _id: "13324",
    name: "TEST COMPANY ",
    valid_url: 1,
    url: "https://test.link",
    client_id: 1696,
  },
];

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
  const { setStep, company, setCompany } = useOrderForm() as OrderFormContext;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SelectCompanySchema>({
    resolver: zodResolver(selectCompanySchema),
  });

  const handleSelectCompany = (companyId: string) => {
    const foundCompany = companyLinks.find((comp) => comp._id === companyId);
    if (!foundCompany) return;

    setValue("url", foundCompany.url);
    setCompany({ name: foundCompany.name, url: foundCompany.url });
  };

  const onSubmit: SubmitHandler<SelectCompanySchema> = (data) => {
    // data.name here is returning the ID because of how our select component can only pass primitives
    // and we need the ID as identifier for our handleSelect function.
    // We can just try to do the find method
    // here as well to make it much cleaner
    setCompany({ name: company.name, url: data.url });
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

  const handleAddCompany = () => {
    if (newCompanyErrors.name.error || newCompanyErrors.url.error) {
      setShowErrors(true);
      return;
    }

    if (showNewCompanyErrors) {
      setShowErrors(false);
    }

    // add new company query here later
  };

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
              defaultValue={company.name}
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
                  <option value={company._id} key={index}>
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
        <span className="font-medium text-sm">Company Links</span>
        <CompanyLinksTable companies={companyLinks} />
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
          <Button type="button" onClick={handleAddCompany} variant="black">
            Add
          </Button>
        </div>
      </div>
      {children}
    </form>
  );
};

export default OrderFormStep3;
