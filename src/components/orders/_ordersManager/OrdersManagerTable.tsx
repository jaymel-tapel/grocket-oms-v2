import { useState } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import SearchInput from "../../tools/searchInput/SearchInput";
import { FilterLogo } from "../../tools/svg/FilterLogo";
import { Orders } from "../../../services/queries/orderQueries";
import { useNavigate } from "@tanstack/react-router";

const DataHead: string[] = [
  "Date",
  "Order ID",
  "Client",
  "Total",
  "Review",
  "Payment Status",
  "Remarks",
];

type OrdersManagerTableProps = {
  orders: Orders;
};

const OrdersManagerTable: React.FC<OrdersManagerTableProps> = ({
  orders = [],
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = (orderId: string) => {
    navigate({ to: "/orders/$orderId", params: { orderId } });
  };

  return (
    <div className="bg-white">
      <TableContainer>
        <div className="flex justify-between mt-6 ml-6">
          <div>
            <SearchInput
              className={"w-46 bg-gray-200"}
              type="text"
              id="Client Name"
              placeholder=" Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mr-[11rem]">
            <button className="flex border py-2 px-4 rounded-md">
              <span className="mt-1 mr-2">{FilterLogo}</span> Filters
            </button>
          </div>
          <div className="mr-8 gap-4">
            <input
              className="border mr-2 py-2 px-2 rounded-sm"
              type="date"
              placeholder="Date Start"
            />
            <input
              className="border py-2 px-2 rounded-sm"
              type="date"
              placeholder="End Date"
            />
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              {DataHead.map((head, i) => (
                <TableHeadCell key={i}>{head}</TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow
                key={i}
                className="cursor-pointer"
                onClick={() => handleClick(order._id)}
              >
                <TableBodyCell>{order.date}</TableBodyCell>
                <TableBodyCell>{order._id}</TableBodyCell>
                <TableBodyCell>{order.client}</TableBodyCell>
                <TableBodyCell>{order.total}</TableBodyCell>
                <TableBodyCell>{order.reviews.length}</TableBodyCell>
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
      </TableContainer>
    </div>
  );
};

export default OrdersManagerTable;
