import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { cleanAuthorization } from "../../utils/utils";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, error) => {
        if (
          axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
        ) {
          if (error.response?.status === 401) {
            return false;
          }
        }
        return true;
      },
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.dontNotifyError === true) {
        return;
      }

      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        // Force logout on unauthorized error
        if (error.response?.status === 401) {
          cleanAuthorization();
          setTimeout(() => {
            const newUrl = `${window.location.origin}/?login=expired`;
            window.location.href = newUrl;
          }, 500);
          return;
        }

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
    onError: (error, _, __, mutation) => {
      if (mutation?.meta?.dontNotifyError === true) {
        return;
      }

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
