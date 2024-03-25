import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../tools/buttons/Button";
import {
  User,
  useCreateAccount,
  useUpdateAccount,
} from "../../../services/queries/accountsQueries";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import Spinner from "../../tools/spinner/Spinner";
import { useUpdateProfile } from "../../../services/queries/userQueries";

const ROLES = ["ADMIN", "ACCOUNTANT", "SELLER"];

const userFormSchema = z.object({
  name: z.string(),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .optional(),
  role: z.string().optional(),
  contact_url: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

type FormProps = {
  user?: User;
  userId?: number;
};

const UserForm: React.FC<FormProps> = ({ userId, user }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { location } = useRouterState();

  // Check whether we're on profile page or users manager page
  const isOnProfile = useMemo(() => {
    if (location.pathname.includes("users_manager")) {
      return false;
    }

    return true;
  }, [location]);

  // API calls used for Users Manager
  const { mutateAsync: createAccount, isPending: isCreating } =
    useCreateAccount();
  const { mutateAsync: updateAccount, isPending: isUpdating } =
    useUpdateAccount();

  // API call used for Profile
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    values: userId ? user : undefined,
  });

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    if (isOnProfile) {
      await updateProfile({ id: userId as number, payload: data });
    } else if (!isOnProfile) {
      const response = userId
        ? await updateAccount({ id: userId, payload: data })
        : await createAccount(data);

      if (response.status === 200 || response.status === 201) {
        navigate({ to: "/accounts/users_manager" });
      }
    }
  };

  return (
    <form
      className="bg-white w-full max-w-[40rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-8 flex flex-col border-b border-b-gray-300">
        <span>Personal Details</span>
        <span className="text-xs text-gray-400">
          Remember to provide accurate and up-to-date information
        </span>
      </div>

      <div className="p-8 pb-4">
        <div className="mb-8 grid grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="w-full mt-2">
              <div
                className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-inset ${
                  errors.name && "border-red-500"
                }`}
              >
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  id="userName"
                  {...register("name")}
                  className="w-full border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="userContactNumber"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="userContactNumber"
                {...register("phone")}
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

          <div className="col-span-2">
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="w-full mt-2">
              <div
                className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-inset ${
                  errors.email && "border-red-500"
                }`}
              >
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  <EnvelopeIcon className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  id="userEmail"
                  {...register("email")}
                  className="w-full border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="userUrl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contact URL
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="userUrl"
                {...register("contact_url")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.contact_url && "border-red-500"
                }`}
              />
              {errors.contact_url && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.contact_url?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isOnProfile && (
        <>
          <div className="p-8 flex flex-col border-y border-y-gray-300">
            <span>Other Details</span>
            <span className="text-xs text-gray-400">
              Please provide additional information that may be relevant or
              required based on the context
            </span>
          </div>

          <div className="p-8 grid grid-cols-1 gap-4 border-b border-b-gray-300">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  autoComplete="off"
                  {...register("role")}
                  className={`capitalize block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    errors.role && "border-red-500"
                  }`}
                >
                  <option disabled>Select Role</option>
                  {ROLES?.map((role, index) => {
                    return (
                      <option
                        value={`${role}`}
                        key={index}
                        className="capitalize"
                      >
                        {role.toLocaleLowerCase()}
                      </option>
                    );
                  })}
                </select>
                {errors.role && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.role?.message}
                  </p>
                )}
              </div>
            </div>

            {!userId && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    {...register("password")}
                  />
                  <div
                    className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <EyeSlashIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <div className="p-8 flex justify-end gap-4">
        <Button type="button" variant="noBorder">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isCreating || isUpdating || isUpdatingProfile}
        >
          {isCreating || isUpdating || isUpdatingProfile ? (
            <>
              <Spinner /> Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
