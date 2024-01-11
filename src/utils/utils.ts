import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isAuth = () => {
  // try {
  //   const access_token = localStorage.getItem("access_token");
  //   if (access_token) {
  //     return true;
  //   }
  //   return false;
  // } catch (e) {
  //   return false;
  // }

  // uncomment later above code
  const test = 1 + 1;
  if (test === 2) return true;
  return false;
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
