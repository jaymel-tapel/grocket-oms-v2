import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  OrderFormContext,
  useOrderForm,
} from "../../../../context/NewOrderFormContext";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useGetAllSellers } from "../../../../services/queries/sellerQueries";
import AutoComplete from "../../../tools/autoComplete/AutoComplete";
import { Client } from "../../../../services/queries/clientsQueries";
import { useUserAuthContext } from "../../../../context/UserAuthContext";
import { useGetUserProfile } from "../../../../services/queries/userQueries";

const selectSellerSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
});

type SelectSellerSchema = z.infer<typeof selectSellerSchema>;

type FormProps = {
  children: ReactNode;
  clientData: boolean;
};

const OrderFormStep1: React.FC<FormProps> = ({ children, clientData }) => {
  const { setStep, seller, setSeller } = useOrderForm() as OrderFormContext;
  const [sellerDraft, setSellerDraft] = useState("");

  const { user } = useUserAuthContext();
  const { data: userProfile } = useGetUserProfile();

  const sellerEmails = useMemo(() => {
    if (!userProfile?.alternateEmails) return [user?.email];

    return [
      userProfile.email,
      ...userProfile.alternateEmails.map((item) => item.email),
    ];
  }, [userProfile, user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SelectSellerSchema>({
    resolver: zodResolver(selectSellerSchema),
    values: seller,
  });

  const { data: sellers } = useGetAllSellers();

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
    const seller = sellers?.find((seller) => seller.email === email);
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
    const seller = sellers?.find((seller) => seller.email === data.email);

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
    if (!user) return;

    if (user.role === "SELLER") {
      setValue("email", user.email ?? "");
      setValue("name", user.name);
      setSellerDraft(user.email);

      setSeller({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else if (clientData) {
      const data = localStorage.getItem("client");
      if (!data) return;

      const client = JSON.parse(data) as Client;
      setValue("email", client.seller.email ?? "");
      setValue("name", client.seller.name);
      setSellerDraft(client.seller.email);

      setSeller({
        id: client.seller.id,
        name: client.seller.name,
        email: client.seller.email,
      });
    }
    //eslint-disable-next-line
  }, [user, clientData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <span className="font-bold text-sm">Seller Information</span>
      <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="sellerEmail"
            className="mb-2 block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          {(user?.role === "ADMIN" || user?.role === "ACCOUNTANT") && (
            <AutoComplete
              suggestions={sellers?.map((seller) => seller.email ?? "") ?? []}
              type="email"
              value={sellerDraft}
              handleChange={(value) => handleChange("email", value)}
              handleSelect={(value) => handleEmailSelect(value)}
              // disabled={user?.role === "SELLER"}
            />
          )}

          {user?.role === "SELLER" && (
            <select
              id="sellerEmails"
              autoComplete="off"
              defaultValue={seller.email}
              {...register("email", {
                onChange: (e) => handleChange("email", e.target.value),
              })}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                errors.email && "border-red-500"
              }`}
            >
              {sellerEmails.map((email, index) => {
                return (
                  <option value={email} key={index}>
                    {email}
                  </option>
                );
              })}
            </select>
          )}
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
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
              disabled={user?.role === "SELLER"}
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
