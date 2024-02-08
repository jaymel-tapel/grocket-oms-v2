import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Order } from "../../../services/queries/orderQueries";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Pagination } from "../../../services/queries/accountsQueries";
import { useEffect, useState } from "react";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";

const COLUMNS = [
  "DATE",
  "ORDER ID",
  "ClIENT",
  "TOTAL",
  "REVIEWS",
  "PAYMENT STATUS",
  "REMARKS",
];

const itemsPerPage = 10;

type TableProps = {
  orders: Order[];
  pagination: Pagination;
};

const OrdersManagerTable: React.FC<TableProps> = ({
  orders = [],
  pagination,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (value: number | PaginationNavs) => {
    if (typeof value === "number") {
      setCurrentPage(value);
      return;
    }

    const lastPage = pagination.lastPage;

    if (value === "first") {
      setCurrentPage(1);
    } else if (value === "prev") {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (value === "next") {
      if (currentPage !== lastPage) {
        setCurrentPage(currentPage + 1);
      }
    } else if (value === "last") {
      setCurrentPage(lastPage);
    }
  };

  useEffect(() => {
    navigate({
      to: "/orders/orders_manager",
      /* @ts-expect-error idk why this is giving error all of a sudden */
      search: ({ searchOrders }) => {
        return {
          searchOrders: {
            ...searchOrders,
            page: currentPage,
            perPage: itemsPerPage,
          },
        };
      },
    });
    //eslint-disable-next-line
  }, [currentPage]);

  const handleClick = (orderId: number) => {
    navigate({
      to: "/orders/orders_manager/$orderId",
      params: { orderId },
    });
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
          {orders.length === 0 && (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={7}>
                No data found.
              </TableBodyCell>
            </TableRow>
          )}
          {orders.map((order, i) => (
            <TableRow
              key={i}
              className="cursor-pointer"
              onClick={() => handleClick(order.id)}
            >
              <TableBodyCell>
                {dayjs(order.createdAt).format("MM-DD-YYYY")}
              </TableBodyCell>
              <TableBodyCell>{order.id}</TableBodyCell>
              <TableBodyCell>{order.client.name}</TableBodyCell>
              <TableBodyCell>{order.total_price}</TableBodyCell>
              <TableBodyCell>{order.orderReviewCount}</TableBodyCell>
              <TableBodyCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {order.payment_status}
                </span>
              </TableBodyCell>
              <TableBodyCell>{order.remarks}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        itemsPerPage={10}
        currentPage={currentPage}
        lastPage={pagination.lastPage}
        handlePageChange={handlePageChange}
        totalItems={pagination.total}
      />
    </TableContainer>
  );
};

export default OrdersManagerTable;
