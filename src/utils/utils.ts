import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { range } from "lodash";
import { Brands } from "../services/queries/brandsQueries";

const LOCAL_STORAGE_KEY = "access_token";

export const setAuthorization = (access_token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, access_token);
};

export const cleanAuthorization = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("client");
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
};

// export const isMoreThanDaysAgo = (days: number): boolean => {
//   const _lastLoggedIn = localStorage.getItem("lastLogin");

//   if (!_lastLoggedIn) {
//     return true;
//   }

//   const today = dayjs();
//   const lastLoggedIn = dayjs(_lastLoggedIn);
//   const differenceInDays = today.diff(lastLoggedIn, "day");

//   // Check if the difference is greater than x days
//   return differenceInDays > days;
// };

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
  email: string;
};

export const getUserInfo = (): UserLocalInfo | undefined => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user) as UserLocalInfo;
  }
};

export const getLocalStorageBrand = (): Brands | undefined => {
  const brand = localStorage.getItem("brand");

  if (brand) {
    return JSON.parse(brand);
  }
};

export const isEmpty = (obj: object) => {
  return !Object.values(obj).filter((value) => !!value).length;
};

export const getPaginationRange = (
  totalPage: number,
  page: number,
  siblings: number
) => {
  const totalPageNumber = 7 + siblings;

  if (totalPageNumber >= totalPage) {
    return range(1, totalPage + 1);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPage);

  const isLeftDots = leftSiblingsIndex > 2;
  const isRightDots = rightSiblingsIndex < totalPage - 2;

  // show dots on the left
  if (!isLeftDots && isRightDots) {
    const leftPagesCount = 3 + 2 * siblings;
    const leftRange = range(1, leftPagesCount + 1);
    return [...leftRange, " ...", totalPage];
  } // show dots on the right
  else if (isLeftDots && !isRightDots) {
    const rightPagesCount = 3 + 2 * siblings;
    const rightRange = range(totalPage - rightPagesCount, totalPage);
    return [1, "... ", ...rightRange];
  } // show dots on both sides
  else {
    const middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};

export const getActiveFilterLabel = (filter: string | undefined) => {
  switch (filter) {
    case "id":
      return "ID";
    case "email":
      return "Email";
    case "order_id":
      return "Order ID";
    case "company":
      return "Company";
    case "payment_status":
      return "Payment Status";
    case "review_status":
      return "Review Status";
    case "reviewer_name":
      return "Reviewer Name";
    case "client":
      return "Client";
    case "seller":
      return "Seller";
    case "remarks":
      return "Remarks";
    default:
      return "";
  }
};

type ColorKey = "default" | "lightBlue" | "green" | "orange" | "yellow" | "red";

export type PaymentStatus = {
  label: string;
  color: ColorKey;
};

export const getPaymentStatus = (status: string): PaymentStatus => {
  switch (status) {
    case "NEW":
      return { label: "New", color: "default" };
    case "PR1":
      return { label: "Reminder 1", color: "yellow" };
    case "PR2":
      return { label: "Reminder 2", color: "orange" };
    case "SENT_INVOICE":
      return { label: "Sent Invoice", color: "lightBlue" };
    case "PAID":
      return { label: "Paid", color: "green" };
    case "UNPAID":
      return { label: "Unpaid", color: "red" };
    default:
      return { label: "New", color: "default" };
  }
};

export const sliceDate = (date: string) => {
  if (!date) return "";

  return date.slice(0, 10);
};

export const parseEstimate = (durationStr: string) => {
  const units: { [key: string]: number } = {
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000,
  };
  const regex = /(\d+)\s*(d|h|m|s)/g;
  let totalMilliseconds = 0;

  let match;
  while ((match = regex.exec(durationStr)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    totalMilliseconds += value * units[unit];
  }

  return totalMilliseconds;
};
