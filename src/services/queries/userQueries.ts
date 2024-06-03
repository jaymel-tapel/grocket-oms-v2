import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getHeaders, setAuthorization } from "../../utils/utils";
import toast from "react-hot-toast";
import { User } from "./accountsQueries";
import { UserFormSchema } from "../../components/accounts/usersManager/UserForm";
import { useUserAuthContext } from "../../context/UserAuthContext";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;
const loginUrl = API_URL + "/auth/login";
const profileUrl = API_URL + "/profile";

const DASHBOARD_URL = API_URL + "/dashboard";

type loginDetails = {
  username: string;
  password: string;
};

type DashboardParams = {
  startRange?: string;
  endRange?: string;
  code?: string;
};

type AdminStatsResponse = {
  ordersOverview: {
    totalOrderCount: number;
    newOrdersCount: number;
    paidOrdersCount: number;
    invoiceOrdersCount: number;
    pr1Count: number;
    pr2Count: number;
    newOrdersPercent: number;
    paidOrdersPercent: number;
    invoiceOrdersPercent: number;
    pr1Percent: number;
    pr2Percent: number;
  };
  newClientsCount: number;
  revenue: number;
  clientsOverview: Array<{
    name: string;
    email: string;
    industry: string;
    order: number;
    amount: number;
    date: string; // ISO8601 date format
  }>;
};

type AdminGraphResponse = {
  receivedAmount: number;
  unpaidAmount: number;
  paidReviews: Array<{
    date: string; // ISO8601 date format
    paidReviewsCount: number;
  }>;
  unpaidReviews: Array<{
    date: string; // ISO8601 date format
    unpaidReviewsCount: number;
  }>;
};

type SellerStatsResponse = {
  clientsOverview: Array<{
    name: string;
    email: string;
    industry: string;
    order: number;
    amount: number;
    date: string; // ISO8601 date format
  }>;
  unpaidCommission: number;
  currentCommission: number;
  newClientsCount: number;
  newOrdersCount: number;
  ordersOverview: {
    client: string;
    date: string;
    id: number;
    payment_status: string;
    remarks: string;
    reviews: number;
    total: number;
  }[];
};

type SellerGraphResponse = {
  newOrdersStat: {
    date: string;
    paidReviewsCount: number;
  }[];
};

export const useLogin = () => {
  const { setUser } = useUserAuthContext();

  return useMutation({
    mutationFn: (payload: loginDetails) => {
      return axios.post(loginUrl, payload);
    },
    onSuccess: ({ data }) => {
      setAuthorization(data.access_token);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("lastLogin", dayjs().format("MM/DD/YYYY"));
      setUser(data);
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

// GET

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

export const useGetAdminDashboard = (search?: DashboardParams) => {
  const statsQuery = useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["dashboard-stats", search],
    queryFn: async (): Promise<AdminStatsResponse> => {
      const response = await axios.get(DASHBOARD_URL + "/admin", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });

  const graphQuery = useQuery({
    // enabled: search?.code !== undefined ? true : false,
    queryKey: ["dashboard-graph", search],
    queryFn: async (): Promise<AdminGraphResponse> => {
      const response = await axios.get(DASHBOARD_URL + "/admin/graph", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });

  return {
    statsData: statsQuery.data,
    graphData: graphQuery.data,
  };
};

export const useGetSellerDashboard = (search?: DashboardParams) => {
  const statsQuery = useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["dashboard-stats", search],
    queryFn: async (): Promise<SellerStatsResponse> => {
      const response = await axios.get(DASHBOARD_URL + "/seller", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });

  const graphQuery = useQuery({
    // enabled: search?.code !== undefined ? true : false,
    queryKey: ["dashboard-graph", search],
    queryFn: async (): Promise<SellerGraphResponse> => {
      const response = await axios.get(DASHBOARD_URL + "/seller/graph", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });

  return {
    statsData: statsQuery.data,
    graphData: graphQuery.data,
  };
};

// AUTHENTICATED POST

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

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: {
      old_password: string;
      new_password: string;
      confirm_password: string;
    }) => {
      return axios.patch(profileUrl + "/change-password", payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Password has been changed.");
    },
  });
};

// PATCH / PUT

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: {
      id: number;
      payload: UserFormSchema & { alternateEmails: string[] };
    }) => {
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
