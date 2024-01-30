import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormContext, useOrderForm } from "./NewOrderFormContext";
import { ReactNode } from "react";

const origins = [
  { _id: 1, name: "Test Origin 1" },
  { _id: 2, name: "Test Origin 2" },
  { _id: 3, name: "Test Origin 3" },
] as const;

const industries = [
  { _id: 1, name: "Test Industry 1" },
  { _id: 2, name: "Test Industry 2" },
  { _id: 3, name: "Test Industry 3" },
] as const;

const selectClientSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  phone: z.string().optional(),
  third_party_id: z.string().optional(),
  origin: z.coerce.number(),
  industry: z.coerce.number(),
  unit_cost: z.coerce.number(),
});

type SelectClientSchema = z.infer<typeof selectClientSchema>;

type FormProps = {
  children: ReactNode;
};

const OrderFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, client, setClient } = useOrderForm() as OrderFormContext;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SelectClientSchema>({
    resolver: zodResolver(selectClientSchema),
  });

  const handleChange = (field: keyof typeof client, value: string | number) => {
    setClient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit: SubmitHandler<SelectClientSchema> = (data) => {
    setClient({ ...data, phone: data.phone ?? "" });
    setStep(3);
  };

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
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
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
            <div className="w-full mt-2">
              <input
                type="email"
                id="clientEmail"
                defaultValue={client.email}
                {...register("email", {
                  onChange: (e) => handleChange("email", e.target.value),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.email && "border-red-500"
                }`}
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
                {...register("origin", {
                  onChange: (e) =>
                    handleChange("origin", parseInt(e.target.value)),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.origin && "border-red-500"
                }`}
              >
                <option disabled>Select Origin</option>
                {origins?.map((origin, index) => {
                  return (
                    <option value={`${origin._id}`} key={index}>
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
                {...register("industry", {
                  onChange: (e) =>
                    handleChange("industry", parseInt(e.target.value)),
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.industry && "border-red-500"
                }`}
              >
                <option disabled>Select Industry</option>
                {industries?.map((industry, index) => {
                  return (
                    <option value={`${industry._id}`} key={index}>
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
