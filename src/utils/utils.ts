import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const LOCAL_STORAGE_KEY = "access_token";

export const setAuthorization = (access_token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, access_token);
};

export const cleanAuthorization = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.removeItem("user");
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

export const getHeaders = () => {
  const accessToken = localStorage.getItem("access_token");

  const header = {
    Authorization: `Bearer ${accessToken}`,
  };

  return header;
};

export type UserLocalInfo = {
  id: number;
  name: string;
  role: string;
  profile_image: string;
};

export const getUserInfo = (): UserLocalInfo | undefined => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user) as UserLocalInfo;
  }
};

export const isEmpty = (obj: object) => {
  return !Object.values(obj).filter((value) => !!value).length;
};
