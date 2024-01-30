import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getHeaders, setAuthorization } from "../../utils/utils";
import toast from "react-hot-toast";
import { User } from "./accountsQueries";
import { UserFormSchema } from "../../components/accounts/usersManager/UserForm";

type loginDetails = {
  username: string;
  password: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const loginUrl = API_URL + "/auth/login";
const profileUrl = API_URL + "/profile";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: loginDetails) => {
      return axios.post(loginUrl, payload);
    },
    onSuccess: ({ data }) => {
      setAuthorization(data.access_token);

      const userInfo = {
        id: data.id,
        name: data.name,
        role: data.role,
        profile_image: data.profile_image,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));
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
  recover_code: string;
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

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<User> => {
      const { data } = await axios.get(profileUrl, { headers: getHeaders() });

      const userInfo = {
        id: data.id,
        name: data.name,
        role: data.role,
        profile_image: data.profile_image,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      return data;
    },
  });
};

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: FormData }) => {
      return await axios.post(profileUrl + `/upload/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("User photo updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: UserFormSchema }) => {
      return await axios.patch(profileUrl + `/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("User profile updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
