import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginPage from "../../components/sections/LoginPage";
import { Button } from "../../components/tools/buttons/Button";
import { useForgotPassword } from "../../services/queries/userQueries";
import Spinner from "../../components/tools/spinner/Spinner";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Enter valid email address" }),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
const ForgotPassword = () => {
  const { mutate: forgotPass, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
    try {
      await forgotPass(data.email);
    } catch (error) {
      console.error("Error sending password reset link:", error);
    }
  };
  return (
    <LoginPage
      headLabel="Reset Password"
      downLabel="Enter your email address to receive a password reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-lg border  border-stroke mb-2 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none "
            />
            <span className="mt-2 px-2 text-red-500">
              {errors.email?.message}
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
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
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
            {isPending ? <Spinner /> : "Send Password Reset Link"}
          </Button>
        </div>
      </form>
    </LoginPage>
  );
};

export default ForgotPassword;
