import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Order, useUpdateOrder } from "../../../services/queries/orderQueries";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Pagination } from "../../../services/queries/accountsQueries";
import { useEffect, useState } from "react";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../../tools/popover/Popover";
import Pill from "../../tools/pill/Pill";
import { getPaymentStatus } from "../../../utils/utils";
import Spinner from "../../tools/spinner/Spinner";

const COLUMNS = [
  "DATE",
  "ORDER ID",
  "ClIENT",
  "TOTAL",
  "REVIEWS",
  "PAYMENT STATUS",
  "REMARKS",
];

const PAYMENT_STATUS = [
  { label: "New", payload: "NEW", color: "default" },
  { label: "Reminder 1", payload: "PR1", color: "yellow" },
  { label: "Reminder 2", payload: "PR2", color: "orange" },
  { label: "Sent Invoice", payload: "SENT INVOICE", color: "lightBlue" },
  { label: "Paid", payload: "PAID", color: "green" },
  { label: "Unpaid", payload: "UNPAID", color: "red" },
] as const;

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
  const [identifier, setIdentifier] = useState<number | null>(null);
  const { mutateAsync: updateOrder, isPending: isUpdating } = useUpdateOrder();

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
      search: (search) => {
        return {
          ...search,
          page: currentPage,
          perPage: itemsPerPage,
        };
      },
      params: true,
    });
    //eslint-disable-next-line
  }, [currentPage]);

  const handleRowClick = (orderId: number) => {
    navigate({
      to: "/orders/orders_manager/$orderId",
      params: { orderId },
    });
  };

  const handlePaymentStatusChange = async (
    payment_status: string,
    order: Order
  ) => {
    const payload = {
      payment_status,
      seller_name: order.seller.name,
      seller_email: order.seller.email,
      seller_id: order.sellerId,
      client_name: order.client.name,
      client_email: order.client.email,
      sourceId: order.client.clientInfo.sourceId,
      industryId: order.client.clientInfo.industryId,
      companyId: order.company.id,
      company_name: order.company.name,
      company_url: order.company.url,
      unit_cost: order.unit_cost,
      brandId: order.brandId,
    };

    setIdentifier(order.id);
    await updateOrder({ orderId: order.id, payload });

    setIdentifier(null);
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
          {orders.length === 0 ? (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={7}>
                No data found.
              </TableBodyCell>
            </TableRow>
          ) : (
            orders.map((order, i) => {
              const paymentStatus = getPaymentStatus(order.payment_status);
              const isUpdatingOrder = isUpdating && identifier === order.id;

              return (
                <TableRow
                  key={i}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
                  <TableBodyCell>
                    {dayjs(order.createdAt).format("MM-DD-YYYY")}
                  </TableBodyCell>
                  <TableBodyCell>{order.id}</TableBodyCell>
                  <TableBodyCell>{order.client.name}</TableBodyCell>
                  <TableBodyCell>{order.total_price}</TableBodyCell>
                  <TableBodyCell>{order.orderReviewCount}</TableBodyCell>
                  <TableBodyCell>
                    {isUpdatingOrder ? (
                      <Pill bgColor={paymentStatus.color}>
                        <Spinner />
                        {paymentStatus.label}
                      </Pill>
                    ) : (
                      <Popover>
                        <PopoverAnchor asChild>
                          <PopoverTrigger asChild>
                            <Pill
                              onClick={(e) => e.stopPropagation()}
                              bgColor={paymentStatus.color}
                            >
                              {paymentStatus.label}
                            </Pill>
                          </PopoverTrigger>
                        </PopoverAnchor>
                        <PopoverContent className="max-w-80" align="start">
                          <div className="flex flex-wrap gap-4">
                            {PAYMENT_STATUS.map((status, statusIndex) => {
                              const isActiveStatus =
                                status.payload === order.payment_status;
                              return (
                                <Pill
                                  key={statusIndex}
                                  bgColor={status.color}
                                  variant={
                                    isActiveStatus ? "default" : "outline"
                                  }
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaymentStatusChange(
                                      status.payload,
                                      order
                                    );
                                  }}
                                >
                                  {status.label}
                                </Pill>
                              );
                            })}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </TableBodyCell>
                  <TableBodyCell>{order.remarks}</TableBodyCell>
                </TableRow>
              );
            })
          )}
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
