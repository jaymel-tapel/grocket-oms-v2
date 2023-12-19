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

const OrdersManagerTable: React.FC = () => {
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate({ to: "/orders/new" });
  };

  const [search, setSearch] = useState("");
  const [tabledata] = useState([
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
    {
      Date: "09/15/2022 2:04:59 PM",
      Order_ID: "1021",
      Client: "Micheal Angelo D. Russel",
      Total: "$1.49",
      Review: "1",
      Payment_status: "New",
      Remarks: "test",
    },
  ]);

  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Orders</p> / <p className="text-[#41B2E9]">Orders Manager</p>
          </span>
        </div>

        <button
          type="button"
          className="rounded-md bg-[#41B2E9] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>
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
              {tabledata.map((item, i) => (
                <TableRow key={i}>
                  <TableBodyCell>{item.Date}</TableBodyCell>
                  <TableBodyCell>{item.Order_ID}</TableBodyCell>
                  <TableBodyCell>{item.Client}</TableBodyCell>
                  <TableBodyCell>{item.Total}</TableBodyCell>
                  <TableBodyCell>{item.Review}</TableBodyCell>
                  <TableBodyCell>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {item.Payment_status}
                    </span>
                  </TableBodyCell>
                  <TableBodyCell>{item.Remarks}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrdersManagerTable;
