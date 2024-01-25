import React, { useMemo } from "react";
import { cn, getPaginationRange } from "../../../utils/utils";

type PaginationProps = {
  currentPage: number;
  handlePageChange: (value: number | string) => void;
  totalItems: number;
  itemsPerPage: number;
};

const TablePaginationLocal: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  totalItems,
  itemsPerPage = 10,
}) => {
  const pages = useMemo(() => {
    const totalPage = Math.ceil(totalItems / itemsPerPage);
    return getPaginationRange(totalPage, currentPage, itemsPerPage, 1);
  }, [currentPage, totalItems, itemsPerPage]);

  const itemIndexes = useMemo(() => {
    if (totalItems === 0) {
      return { firstIndex: 0, lastIndex: 0 };
    }

    const firstIndex = currentPage * itemsPerPage - itemsPerPage + 1;
    const lastIndex = currentPage * itemsPerPage;

    return { firstIndex, lastIndex };
  }, [currentPage, totalItems, itemsPerPage]);

  return (
    <div className="p-4 sm:p-6 xl:p-7.5 flex justify-between">
      <div>
        Showing {itemIndexes.firstIndex} - {itemIndexes.lastIndex} of{" "}
        {totalItems}
      </div>
      <nav>
        <ul className="flex flex-wrap items-center text-sm text-gray-500">
          <li className="flex items-center justify-center rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white">
            &laquo;
          </li>
          <li className="flex items-center justify-center rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white">
            &lsaquo;
          </li>
          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={cn(
                  page === currentPage && "bg-grBlue-base text-white",
                  "flex items-center justify-center rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </li>
            );
          })}
          <li className="flex items-center justify-center rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white">
            &rsaquo;
          </li>
          <li className="flex items-center justify-center rounded py-1.5 px-3 font-medium hover:bg-grBlue-base hover:text-white">
            &raquo;
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePaginationLocal;
