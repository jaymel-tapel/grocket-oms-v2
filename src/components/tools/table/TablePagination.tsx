import React, { useMemo } from "react";
import { cn, getPaginationRange } from "../../../utils/utils";

export type PaginationNavs = "first" | "last" | "prev" | "next";

type PaginationProps = {
  currentPage: number;
  handlePageChange: (value: number | string) => void;
  totalItems: number;
  itemsPerPage: number;
  isFrontEndPagination?: boolean;
  lastPage?: number;
};

const TablePagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage = 1,
  handlePageChange,
  totalItems,
  itemsPerPage = 10,
  isFrontEndPagination = false,
}) => {
  const pages = useMemo(() => {
    const totalPage = isFrontEndPagination
      ? Math.ceil(totalItems / itemsPerPage)
      : lastPage;

    return getPaginationRange(totalPage, currentPage, 1);
  }, [currentPage, totalItems, itemsPerPage, isFrontEndPagination, lastPage]);

  const itemIndexes = useMemo(() => {
    if (totalItems === 0) {
      return { firstIndex: 0, lastIndex: 0 };
    }

    const firstIndex = currentPage * itemsPerPage - itemsPerPage + 1;
    const lastIndex = currentPage * itemsPerPage;

    const isLastIndexLessThanTotal = lastIndex < totalItems;

    return {
      firstIndex,
      lastIndex: isLastIndexLessThanTotal ? lastIndex : totalItems,
    };
  }, [currentPage, totalItems, itemsPerPage]);

  return (
    <div className="p-4 sm:p-6 xl:p-7.5 flex gap-4 flex-wrap justify-between">
      <div>
        Showing {itemIndexes.firstIndex} - {itemIndexes.lastIndex} of{" "}
        {totalItems}
      </div>
      <nav>
        <ul className="flex flex-wrap items-center text-sm text-gray-500">
          <li
            className="flex items-center justify-center cursor-pointer rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
            onClick={() => handlePageChange("first")}
          >
            &laquo;
          </li>
          <li
            className="flex items-center justify-center cursor-pointer rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
            onClick={() => handlePageChange("prev")}
          >
            &lsaquo;
          </li>
          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={cn(
                  page === currentPage && "bg-grBlue-base text-white",
                  "flex items-center justify-center cursor-pointer rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </li>
            );
          })}
          <li
            className="flex items-center justify-center cursor-pointer rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
            onClick={() => handlePageChange("next")}
          >
            &rsaquo;
          </li>
          <li
            className="flex items-center justify-center cursor-pointer rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
            onClick={() => handlePageChange("last")}
          >
            &raquo;
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
