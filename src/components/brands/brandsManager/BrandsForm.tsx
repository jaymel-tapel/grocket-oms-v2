import { Button } from "../../tools/buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Brands,
  useCreateBrands,
  useUpdateBrands,
} from "../../../services/queries/brandsQueries";
import { useNavigate } from "@tanstack/react-router";
import Spinner from "../../tools/spinner/Spinner";

const CURRENCY = ["USD", "EUR"];

const brandFormSchema = z.object({
  name: z.string(),
  code: z.string(),
  address: z.string(),
  currency: z.string(),
});

export type BrandFormSchema = z.infer<typeof brandFormSchema>;

type FormProps = {
  brands?: Brands;
  brandId: number;
  getFiles: () => File[];
};

const BrandsForm: React.FC<FormProps> = ({ brands, brandId, getFiles }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandFormSchema>({
    resolver: zodResolver(brandFormSchema),
    values: brandId ? brands : undefined,
  });

  const { mutateAsync: createBrand, isPending: isBrandCreating } =
    useCreateBrands();
  const { mutateAsync: updateBrand, isPending: isBrandUpdating } =
    useUpdateBrands();

  const onSubmit: SubmitHandler<BrandFormSchema> = async (data) => {
    const generateFormData = () => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append("currency", data.currency);
      formData.append("address", data.address);

      const files = getFiles();

      if (files.length > 0) {
        formData.append("logo", files[0]);
      }

      return formData;
    };

    const response = brandId
      ? await updateBrand({ id: brandId, payload: data })
      : await createBrand(generateFormData());

    if (response.status === 200 || response.status === 201) {
      navigate({ to: "/brands/brands_manager" });
    }
  };

  const handleCancel = () => {
    navigate({ to: "/brands/brands_manager" });
  };

  return (
    <form
      className="bg-white w-full max-w-[40rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-8 flex flex-col border-b border-b-gray-300">
        <span>Brand Details</span>
        <span className="text-xs text-gray-400">
          Please input some key details about the brand
        </span>
      </div>
      <div className="p-8 pb-4 border-b border-b-gray-300">
        <div className="col-span-2 pb-9">
          <label
            htmlFor="brandName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Brand Name
          </label>
          <div className="w-full mt-2">
            <input
              type="text"
              id="brandName"
              {...register("name")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.name && "border-red-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="col-span-2 pb-9">
          <label
            htmlFor="brandCode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Brand Code
          </label>
          <div className="w-full mt-2">
            <input
              type="text"
              id="brandCode"
              {...register("code")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.code && "border-red-500"
              }`}
            />
          </div>
          {errors.code && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.code?.message}
            </p>
          )}
        </div>
        <div className="col-span-2 pb-9">
          <label
            htmlFor="Address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="w-full mt-2">
            <input
              type="text"
              id="Address"
              {...register("address")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.address && "border-red-500"
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.address?.message}
            </p>
          )}
        </div>
        <div className="col-span-2 pb-9 ">
          <label
            htmlFor="currency"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Currency
          </label>
          <div className="w-full mt-2">
            <select
              id="currency"
              autoComplete="off"
              {...register("currency")}
              className={`capitalize block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.currency && "border-red-500"
              }`}
            >
              <option disabled>Select Currency</option>
              {CURRENCY?.map((currency, i) => {
                return (
                  <option value={`${currency}`} key={i} className="capitalize">
                    {currency.toLocaleLowerCase()}
                  </option>
                );
              })}
            </select>
            {errors.currency && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.currency?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="p-8 flex justify-end gap-4 ">
        <Button onClick={handleCancel} type="button" variant="noBorder">
          Cancel
        </Button>
        <Button type="submit" disabled={isBrandCreating || isBrandUpdating}>
          {isBrandCreating || isBrandUpdating ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default BrandsForm;
