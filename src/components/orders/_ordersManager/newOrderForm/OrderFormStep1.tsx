import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormContext, useOrderForm } from "./NewOrderFormContext";
import { ReactNode } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
// import { debounce } from "lodash";

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
  // const [isEmailFocused, setIsEmailFocused] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    formState: { errors },
  } = useForm<SelectSellerSchema>({
    resolver: zodResolver(selectSellerSchema),
  });

  const sellerEmail = watch("email");
  const debouncedEmail = useDebounce(sellerEmail, 500);
  console.log(debouncedEmail);

  // const { data: sellers } = useGetAllSellers({
  //   keyword: debouncedEmail,
  //   perPage: 5,
  // });

  const handleChange = (field: keyof typeof seller, value: typeof field) => {
    setSeller((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleFocus = (method: "blur" | "focus") => {
  //   if (method === "blur") {
  //     const debounceBlur = debounce(() => setIsEmailFocused(false), 100);
  //     debounceBlur();
  //     return;
  //   }

  //   setIsEmailFocused(true);
  // };

  // const handleEmailSelect = (seller: { id: number, name: string, email: string }) => {
  //   setSeller({
  //     id: seller.id,
  //     name: seller.name,
  //     email: seller.email,
  //   });

  //   setValue("name", seller.name);
  //   setValue("email", seller.email);
  // };

  const onSubmit: SubmitHandler<SelectSellerSchema> = (data) => {
    setSeller(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <span className="font-bold text-sm">Seller Information</span>

      <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4">
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
            htmlFor="sellerEmail"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="w-full mt-2">
            <input
              type="email"
              id="sellerEmail"
              defaultValue={seller.email}
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
      </div>

      {children}
    </form>
  );
};

export default OrderFormStep1;
