import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setAuthorization } from "../../utils/utils";

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
