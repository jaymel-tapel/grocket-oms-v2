import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Order, OrdersParams } from "../../../services/queries/orderQueries";
import dayjs from "dayjs";
import { Pagination } from "../../../services/queries/accountsQueries";
import React from "react";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import Pill from "../../tools/pill/Pill";
import { getPaymentStatus } from "../../../utils/utils";
import Spinner from "../../tools/spinner/Spinner";

const COLUMNS = [
  "DATE",
  "ORDER ID",
  "CLIENT",
  "TOTAL",
  "REVIEWS",
  "PAYMENT STATUS",
  "REMARKS",
];

type TableProps = {
  orders: Order[];
  pagination: Pagination;
  isSearching: boolean;
  search: OrdersParams;
  setSearch: React.Dispatch<React.SetStateAction<OrdersParams>>;
};

const ClientOrderHistoryTable: React.FC<TableProps> = ({
  orders = [],
  pagination,
  isSearching,
  search,
  setSearch,
}) => {
  const handlePageChange = (value: number | PaginationNavs) => {
    if (!search.page) return;

    if (typeof value === "number") {
      setSearch((prev) => ({
        ...prev,
        page: value,
      }));
    }

    const lastPage = pagination.lastPage;

    if (value === "first") {
      setSearch((prev) => ({
        ...prev,
        page: 1,
      }));
    } else if (value === "prev") {
      if (search.page > 1) {
        setSearch((prev) => ({
          ...prev,
          page: (prev.page ?? 2) - 1,
        }));
      }
    } else if (value === "next") {
      if (search.page !== lastPage) {
        setSearch((prev) => ({
          ...prev,
          page: (prev.page ?? 1) + 1,
        }));
      }
    } else if (value === "last") {
      setSearch((prev) => ({
        ...prev,
        page: lastPage,
      }));
    }
  };

  return (
    <TableContainer className="bg-white">
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((col, index) => (
              <TableHeadCell key={index}>{col}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isSearching ? (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={7}>
                <Spinner className="h-12 w-12 mx-auto" />
              </TableBodyCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={7}>
                No data found.
              </TableBodyCell>
            </TableRow>
          ) : (
            orders.map((order, i) => {
              const paymentStatus = getPaymentStatus(order.payment_status);
              return (
                <TableRow
                  key={i}
                  // className="cursor-pointer"
                  // onClick={() => handleRowClick(order.id)}
                >
                  <TableBodyCell>
                    {dayjs(order.createdAt).format("MM-DD-YYYY")}
                  </TableBodyCell>
                  <TableBodyCell>{order.id}</TableBodyCell>
                  <TableBodyCell>{order.client.name}</TableBodyCell>
                  <TableBodyCell>{order.total_price}</TableBodyCell>
                  <TableBodyCell>{order.orderReviewCount}</TableBodyCell>
                  <TableBodyCell>
                    <Pill bgColor={paymentStatus.color}>
                      {paymentStatus.label}
                    </Pill>
                  </TableBodyCell>
                  <TableBodyCell>{order.remarks}</TableBodyCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <TablePagination
        itemsPerPage={search.perPage ?? 10}
        currentPage={search.page ?? 1}
        lastPage={pagination.lastPage}
        handlePageChange={handlePageChange}
        totalItems={pagination.total}
      />
    </TableContainer>
  );
};

export default ClientOrderHistoryTable;
