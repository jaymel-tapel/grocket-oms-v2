import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginPage from "../../components/sections/LoginPage";
import { Button } from "../../components/tools/buttons/Button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useResetPassword } from "../../services/queries/userQueries";
import Spinner from "../../components/tools/spinner/Spinner";

const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." }),
});

type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();

  const { mutateAsync: newPass, isPending } = useResetPassword();
  const { code } = useParams({ from: "/forgot-password/$code" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit: SubmitHandler<NewPasswordSchema> = async (data: {
    password: string;
  }) => {
    if (code) {
      const result = await newPass({
        recover_code: code,
        password: data.password,
      });

      if (result.status === 201) {
        setTimeout(() => {
          navigate({ to: "/" });
        }, 2000);
      }
    } else {
      console.error("Token not found in URL");
    }
  };

  return (
    <LoginPage headLabel="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your new password"
              {...register("password")}
              className="w-full rounded-lg border  border-stroke mb-2 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none "
            />
            <span className="px-2 text-red-500">
              {errors.password?.message}
            </span>
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                    fill=""
                  />
                  <path
                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="mb-5">
          <Button
            type="submit"
            className="w-full h-16 font-md text-xl leading-6 cursor-pointer rounded-lg border border-primary bg-grBlue-dark p-4 text-white transition hover:bg-opacity-90"
          >
            {isPending ? <Spinner /> : "Reset Password"}
          </Button>
        </div>
      </form>
    </LoginPage>
  );
};

export default ResetPassword;
