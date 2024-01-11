import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const LOCAL_STORAGE_KEY = "access_token";

export const setAuthorization = (access_token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, access_token);
};

export const cleanAuthorization = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const isAuth = () => {
  try {
    const access_token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (access_token) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }

  // uncomment later above code
  // const test = 1 + 1;
  // if (test === 2) return false;
  // return false;
};

export const cn = (...inputs: ClassValue[]) => {
  // return inputs.filter(Boolean).join(" ");
  return twMerge(clsx(inputs));
};
