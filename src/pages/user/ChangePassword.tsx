import LoggedSection from "../../components/sections/LoggedSection";
import {
  useChangePassword,
  useGetUserProfile,
} from "../../services/queries/userQueries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../../components/tools/buttons/Button";
import Spinner from "../../components/tools/spinner/Spinner";
import { useNavigate } from "@tanstack/react-router";

const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .superRefine(({ confirm_password, new_password }, ctx) => {
    if (confirm_password !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUserProfile();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    const response = await changePassword(data);

    if (response.status === 200) {
      navigate({ to: "/" });
    }
  };

  return (
    <LoggedSection>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>{user?.name ?? ""} / </p>
          <p className="text-[#41B2E9]">Change Password</p>
        </span>
      </div>

      <form
        className="mt-8 bg-white w-full max-w-[40rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-8 flex flex-col border-b border-b-gray-300">
          <span className="font-medium">Change Password</span>
        </div>

        <div className="p-8 pb-4 flex flex-col gap-6">
          <div>
            <label
              htmlFor="old_password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Old Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="old_password"
                type={showPassword ? "text" : "password"}
                {...register("old_password")}
                className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
              <div
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            {errors.old_password && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.old_password?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="new_password"
                type={showPassword ? "text" : "password"}
                {...register("new_password")}
                className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
              <div
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            {errors.new_password && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.new_password?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm New Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="confirm_password"
                type={showPassword ? "text" : "password"}
                {...register("confirm_password")}
                className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
              <div
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            {errors.confirm_password && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.confirm_password?.message}
              </p>
            )}
          </div>
        </div>

        <div className="p-8 flex justify-end gap-4">
          <Button
            type="button"
            variant="noBorder"
            onClick={() => navigate({ to: "/" })}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </LoggedSection>
  );
};

export default ChangePassword;
