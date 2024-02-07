import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormContext, useOrderForm } from "./NewOrderFormContext";
import { ReactNode, useEffect } from "react";
import {
  useGetClientBySellers,
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../../services/queries/clientsQueries";
import { useDebounce } from "../../../../hooks/useDebounce";
import AutoComplete from "../../../tools/autoComplete/AutoComplete";

const selectClientSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  phone: z.string().optional().catch(""),
  third_party_id: z.string().optional(),
  origin: z.coerce.number().min(1).catch(1),
  industry: z.coerce.number().min(1).catch(41),
  unit_cost: z.coerce.number().min(1).catch(10),
});

type SelectClientSchema = z.infer<typeof selectClientSchema>;

type FormProps = {
  children: ReactNode;
};

const OrderFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, seller, client, setClient, setCompanies } =
    useOrderForm() as OrderFormContext;
  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SelectClientSchema>({
    resolver: zodResolver(selectClientSchema),
    values: client,
  });

  const clientEmail = watch("email");
  const debouncedEmail = useDebounce(clientEmail, 500);

  const { data: clients } = useGetClientBySellers({
    keyword: debouncedEmail,
    sellerId: seller.id,
  });

  const handleChange = (field: keyof typeof client, value: string | number) => {
    setClient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmailSelect = (email: string) => {
    const client = clients?.find((client) => client.email === email);
    if (!client) return;

    setClient({
      id: client.id,
      name: client.name,
      email: client.email,
      industry: client.clientInfo.industryId ?? 41,
      origin: client.clientInfo.sourceId ?? 1,
      phone: client.phone ?? "",
      unit_cost: client.clientInfo.default_unit_cost ?? 10,
      third_party_id: client.clientInfo.thirdPartyId ?? "",
    });

    setCompanies(client.companies);

    setValue("name", client.name);
    setValue("email", client.email);
    setValue("industry", client.clientInfo.industryId ?? 41);
    setValue("origin", client.clientInfo.sourceId ?? 1);
    setValue("phone", client.phone ?? "");
    setValue("unit_cost", client.clientInfo.default_unit_cost ?? 10);
    setValue("third_party_id", client.clientInfo.thirdPartyId ?? "");
  };

  const onSubmit: SubmitHandler<SelectClientSchema> = () => {
    setStep(3);
  };

  useEffect(() => {
    if (debouncedEmail === "") {
      setClient((prev) => ({
        ...prev,
        id: undefined,
      }));
    }
    //eslint-disable-next-line
  }, [debouncedEmail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex flex-col gap-4 border-b border-b-gray-300">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Client Information</span>
          <span className="text-xs text-gray-400">
            Remember to provide accurate and up-to-date information
          </span>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="clientName"
                defaultValue={client.name}
                {...register("name", {
                  onChange: (e) => handleChange("name", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 ${
                  errors.name && "border-red-500"
                }`}
              />
              {errors.name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="clientEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="w-full mt-2 relative">
              <AutoComplete
                suggestions={clients?.map((client) => client.email) ?? []}
                type="email"
                value={client.email}
                handleChange={(value) => handleChange("email", value)}
                handleSelect={(value) => handleEmailSelect(value)}
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="clientPhone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="clientPhone"
                defaultValue={client.phone}
                {...register("phone", {
                  onChange: (e) => handleChange("phone", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.phone && "border-red-500"
                }`}
              />
              {errors.phone && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.phone?.message}
                </p>
              )}
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Status</span>
          <span className="text-xs text-gray-400">
            Please provide additional information that may be relevant or
            required based on the context
          </span>
        </div>

        <div className="my-8 grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="third_party_id"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              3rd Party Id
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="third_party_id"
                defaultValue={client.third_party_id}
                {...register("third_party_id", {
                  onChange: (e) =>
                    handleChange("third_party_id", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.third_party_id && "border-red-500"
                }`}
              />
              {errors.third_party_id && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.third_party_id?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Client Origin
            </label>
            <div className="mt-2">
              <select
                id="origin"
                autoComplete="off"
                defaultValue={client.origin}
                {...register("origin", {
                  onChange: (e) => handleChange("origin", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.origin && "border-red-500"
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
              {errors.origin && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.origin?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Industry
            </label>
            <div className="mt-2">
              <select
                id="industry"
                autoComplete="off"
                defaultValue={client.industry}
                {...register("industry", {
                  onChange: (e) => handleChange("industry", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.industry && "border-red-500"
                }`}
              >
                <option disabled>Select Industry</option>
                {industries?.map((industry, index) => {
                  return (
                    <option value={`${industry.id}`} key={index}>
                      {industry.name}
                    </option>
                  );
                })}
              </select>
              {errors.industry && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.industry?.message}
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
              <input
                type="number"
                id="unit_cost"
                defaultValue={client.unit_cost}
                {...register("unit_cost", {
                  onChange: (e) =>
                    handleChange("unit_cost", parseFloat(e.target.value)),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.unit_cost && "border-red-500"
                }`}
              />
              {errors.unit_cost && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.unit_cost?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default OrderFormStep2;
