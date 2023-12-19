import { useState } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";

const DataHead: string[] = [
  "Date",
  "Order ID",
  "Client",
  "Total",
  "Review",
  "Payment Status",
  "Remarks",
];

const DeletedOrdersTable: React.FC = () => {
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
            <p>Orders</p> / <p className="text-[#41B2E9]">Deleted Orders</p>
          </span>
        </div>
      </div>
      <div className="bg-white">
        <TableContainer>
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
                  <TableBodyCell>{item.Payment_status}</TableBodyCell>
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

export default DeletedOrdersTable;
