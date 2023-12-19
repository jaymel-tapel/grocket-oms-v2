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

const DataHead: string[] = [
  "ID",
  "EMAIL",
  "NAME",
  "ORDERS",
  "TOTAL AMOUNT",
  "DATE REGISTERED",
];

const ClientsReportTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tabledata] = useState([
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
  ]);
  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Clients</p> / <p className="text-[#41B2E9]">Client Report</p>
          </span>
        </div>
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

          <Table classname="">
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
                  <TableBodyCell>{item.ID}</TableBodyCell>
                  <TableBodyCell>{item.EMAIL}</TableBodyCell>
                  <TableBodyCell>{item.NAME}</TableBodyCell>
                  <TableBodyCell>{item.ORDERS}</TableBodyCell>
                  <TableBodyCell>{item.TOTAL_AMOUNT}</TableBodyCell>
                  <TableBodyCell>{item.DATE_REGISTERED}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ClientsReportTable;
