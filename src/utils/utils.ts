import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { range } from "lodash";

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

export const getPaginationRange = (
  totalPage: number,
  page: number,
  itemsPerPage: number,
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
