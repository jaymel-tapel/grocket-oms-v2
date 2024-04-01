import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormContext, useOrderForm } from "./NewOrderFormContext";
import { ReactNode, useEffect, useState } from "react";
import { useGetAllSellers } from "../../../../services/queries/sellerQueries";
import AutoComplete from "../../../tools/autoComplete/AutoComplete";
import { UserLocalInfo, getUserInfo } from "../../../../utils/utils";
import { debounce } from "lodash";

const selectSellerSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
});

type SelectSellerSchema = z.infer<typeof selectSellerSchema>;

type FormProps = {
  children: ReactNode;
};

const OrderFormStep1: React.FC<FormProps> = ({ children }) => {
  const { setStep, seller, setSeller } = useOrderForm() as OrderFormContext;
  const [keyword, setKeyword] = useState("");
  const [sellerDraft, setSellerDraft] = useState("");

  const user = getUserInfo() as UserLocalInfo;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SelectSellerSchema>({
    resolver: zodResolver(selectSellerSchema),
    values: seller,
  });

  const { data: sellers } = useGetAllSellers({
    keyword,
    perPage: 10,
  });

  const handleChange = (field: keyof typeof seller, value) => {
    setSeller((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "email") {
      setValue("email", value as string);
      setSellerDraft(value);
    }
  };

  const handleEmailSelect = (email: string) => {
    const seller = sellers?.data.find((seller) => seller.email === email);
    if (!seller) return;

    setSeller({
      id: seller.id,
      name: seller.name,
      email: seller.email,
    });

    setSellerDraft(seller.email);
    setValue("name", seller.name);
    setValue("email", seller.email);
  };

  const onSubmit: SubmitHandler<SelectSellerSchema> = (data) => {
    const seller = sellers?.data.find((seller) => seller.email === data.email);

    if (seller) {
      setSeller({
        id: seller.id,
        name: seller.name,
        email: seller.email,
      });
    }

    setStep(2);
  };

  useEffect(() => {
    const debounceSeller = debounce(() => {
      setKeyword(sellerDraft);
    }, 500);

    debounceSeller();
    return () => debounceSeller.cancel();
  }, [sellerDraft]);

  useEffect(() => {
    if (user.role === "SELLER") {
      setValue("email", user.email ?? "");
      setValue("name", user.name);
      setSellerDraft(user.email);

      setSeller({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <span className="font-bold text-sm">Seller Information</span>
      <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4">
        <div>
          <label
            htmlFor="sellerEmail"
            className="mb-2 block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <AutoComplete
            suggestions={sellers?.data.map((seller) => seller.email) ?? []}
            type="email"
            value={sellerDraft}
            handleChange={(value) => handleChange("email", value)}
            handleSelect={(value) => handleEmailSelect(value)}
            disabled={user.role === "SELLER"}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="sellerName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="w-full mt-2">
            <input
              type="text"
              id="sellerName"
              defaultValue={seller.name}
              {...register("name", {
                onChange: (e) => handleChange("name", e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.name && "border-red-500"
              }`}
              disabled={user.role === "SELLER"}
            />
            {errors.name && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.name?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default OrderFormStep1;
