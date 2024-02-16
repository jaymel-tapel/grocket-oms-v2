import { useEffect, useState } from "react";
import TableContainer from "../../tools/table/TableContainer";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Pagination } from "../../../services/queries/accountsQueries";
import { useNavigate } from "@tanstack/react-router";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import { Order } from "../../../services/queries/orderQueries";
import dayjs from "dayjs";
import Pill from "../../tools/pill/Pill";
import { getPaymentStatus } from "../../../utils/utils";

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

const DeletedOrdersTable: React.FC<TableProps> = ({ orders, pagination }) => {
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
      to: "/orders/deleted",
      search: (old) => {
        return {
          ...old,
          page: currentPage,
          perPage: itemsPerPage,
        };
      },
    });
    //eslint-disable-next-line
  }, [currentPage]);

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
          {orders.map((order, i) => {
            const paymentStatus = getPaymentStatus(order.payment_status);

            return (
              <TableRow key={i}>
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
          })}
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

export default DeletedOrdersTable;
