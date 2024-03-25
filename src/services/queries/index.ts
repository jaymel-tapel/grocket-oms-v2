import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        toast.error(
          error.response?.data.message ??
            "Something went wrong. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        toast.error(
          error.response?.data.message ??
            "Something went wrong. Please try again."
        );
      } else {
        toast.error("Something went wrong.Please try again.");
      }
    },
  }),
});
