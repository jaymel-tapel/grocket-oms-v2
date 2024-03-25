import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetCities,
  useGetCountries,
  useGetScraperEstimate,
} from "../../../services/queries/prospectsQueries";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../tools/popover/Popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../tools/command/Command";
import Spinner from "../../tools/spinner/Spinner";

const step1Schema = z.object({
  country: z.string(),
  search: z.string(),
  limit: z.coerce.number(),
});

export type Step1Schema = z.infer<typeof step1Schema>;

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep1: React.FC<FormProps> = ({ children }) => {
  const { setStep, cities, setCities, prospectFinder, setProspectFinder } =
    useFindProspectsContext() as FindProspectsContext;

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
  });

  const { data: countries } = useGetCountries();

  const watchCountry = watch("country", "");
  const watchLimit = watch("limit", 10);

  const countryCode = useMemo(() => {
    if (watchCountry) {
      const country = countries?.find(
        (country) => country.country === watchCountry
      );
      if (!country) return "";

      return country.iso2;
    }

    return "";
  }, [watchCountry, countries]);

  const { data: initialCities, isFetching: isFetchingCities } =
    useGetCities(countryCode);

  const { data: estimate } = useGetScraperEstimate({
    limit: watchLimit,
    no_of_cities: cities.length,
  });

  useEffect(() => {
    if (initialCities) {
      setCities(initialCities);
    }
    //eslint-disable-next-line
  }, [initialCities]);

  const handleChange = (
    field: keyof typeof prospectFinder,
    value: typeof field
  ) => {
    setProspectFinder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelect = (name: string) => {
    const foundCountry = countries?.find((country) => country.country === name);
    if (!foundCountry) return;

    // const newCities: City[] = foundCountry.cities.map((city) => {
    //   return { name: city, checked: true, status: "queued" };
    // });

    // setCities(newCities);
  };

  const handleCheck = (cityName: string) => {
    const cityIndex = cities.findIndex(
      (city) => city.name.toLowerCase() === cityName
    );
    if (cityIndex === -1) return;

    const newCities = [...cities];
    newCities[cityIndex].checked = !newCities[cityIndex].checked;
    setCities(newCities);
  };

  const cityLabel = useMemo(() => {
    if (isFetchingCities) {
      return <Spinner className="m-1" />;
    } else if (watchCountry.length > 0 && cities.length === 0) {
      return "No cities found";
    } else if (watchCountry.length > 0 && cities) {
      // const isAllChecked = cities?.every((city) => city.checked === true);
      // if (isAllChecked) {
      //   return "All Cities Selected";
      // } else {
      const selected = cities?.filter((city) => city.checked).length ?? 0;
      return `${selected} ${selected > 1 ? "Cities" : "City"} Selected`;
      // }
    }

    return "--";
  }, [watchCountry, cities, isFetchingCities]);

  const onSubmit: SubmitHandler<Step1Schema> = (data) => {
    setProspectFinder({ ...data, countryCode });
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-8 grid sm:grid-cols-2 gap-x-12 gap-y-4">
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

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              autoComplete="off"
              {...register("country", {
                onChange: (e) => handleSelect(e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.country && "border-red-500"
              }`}
            >
              <option disabled selected value={""}>
                Select Country
              </option>
              {countries?.map((item, index) => {
                return (
                  <option value={`${item.country}`} key={index}>
                    {item.country}
                  </option>
                );
              })}
            </select>
            {errors.country && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.country?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="cities"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cities
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                id="cities"
                type="button"
                disabled={watchCountry.length < 1}
                className="mt-2 flex w-full items-center justify-between rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              >
                {cityLabel}
                <ChevronUpDownIcon className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 popover-content-max-width">
              <Command>
                <CommandInput placeholder="Search cities..." />
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {cities?.map((city, index) => {
                    return (
                      <CommandItem
                        key={city.name}
                        value={city.name}
                        onSelect={(currentValue) => {
                          handleCheck(currentValue);
                        }}
                        className="cursor-pointer"
                      >
                        <input
                          id={`check-${index}`}
                          aria-describedby="check"
                          name={`check-${index}`}
                          type="checkbox"
                          checked={city.checked}
                          onChange={() => handleCheck(city.name)}
                          className="h-4 w-4 rounded border-gray-300 text-grBlue-dark focus:ring-grBlue-dark"
                        />
                        <span className="ml-2">{city.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="sm:col-span-2 mt-8 flex max-md:flex-col gap-4 justify-between text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Estimated Maps Scraping Time</span>
            <span>{estimate?.estimated_search ?? ""}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold">Estimated Website Scraping Time</span>
            <span>{estimate?.estimated_web ?? ""}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold">Estimated Email Scraping Time</span>
            <span>{estimate?.estimated_email ?? ""}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold">Total Estimated Time</span>
            <span>{estimate?.total_estimated_time ?? ""}</span>
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default FindProspectsFormStep1;
