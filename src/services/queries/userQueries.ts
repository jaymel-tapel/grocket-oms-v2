import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getHeaders, setAuthorization } from "../../utils/utils";
import toast from "react-hot-toast";

type loginDetails = {
  username: string;
  password: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const loginUrl = API_URL + "/auth/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: loginDetails) => {
      return axios.post(loginUrl, payload);
    },
    onSuccess: ({ data }) => {
      setAuthorization(data.access_token);
    },
  });
};

//password reset step-1
const forgotPassUrl = API_URL + "/auth/forgot";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return axios.post(forgotPassUrl, { email }, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success(
        "Password reset link has been sent to you email. Please check your email address"
      );
    },
  });
};

//password reset step-2
type NewPassword = {
  recovery_code: string;
  password: string;
};

const resetPasswordUrl = API_URL + "/auth/reset";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: NewPassword) => {
      return axios.post(resetPasswordUrl, payload, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success(
        "Password has been set. You will be redirected to the login page."
      );
    },
  });
};
