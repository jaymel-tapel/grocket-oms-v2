import React, { ReactNode } from "react";
import { z } from "zod";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useScrapeProspects } from "../../../services/queries/prospectsQueries";

const step1Schema = z.object({
  search: z.string(),
  limit: z.coerce.number(),
});

export type Step1Schema = z.infer<typeof step1Schema>;

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep1: React.FC<FormProps> = ({ children }) => {
  const { setStep, prospectFinder, setProspectFinder } =
    useFindProspectsContext() as FindProspectsContext;

  const { mutateAsync: scapeProspects } = useScrapeProspects();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
  });

  const handleChange = (
    field: keyof typeof prospectFinder,
    value: typeof field
  ) => {
    setProspectFinder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit: SubmitHandler<Step1Schema> = (data) => {
    setProspectFinder(data);
    scapeProspects(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4">
        <div>
          <label
            htmlFor="prospectKeyword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Keyword
          </label>
          <div className="w-full mt-2">
            <input
              type="text"
              id="prospectKeyword"
              defaultValue={prospectFinder.search}
              {...register("search", {
                onChange: (e) => handleChange("search", e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.search && "border-red-500"
              }`}
            />
            {errors.search && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.search?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="prospectLimit"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Number of Results
          </label>
          <div className="w-full mt-2">
            <input
              type="number"
              id="prospectLimit"
              defaultValue={prospectFinder.limit}
              max={1000}
              {...register("limit", {
                onChange: (e) => handleChange("limit", e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.limit && "border-red-500"
              }`}
            />
            {errors.limit && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.limit?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default FindProspectsFormStep1;
