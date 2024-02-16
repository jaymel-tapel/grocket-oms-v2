import { getPaymentStatus } from "../../../utils/utils";
import Pill from "../../tools/pill/Pill";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";

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
  orders: {
    date: string;
    orderId: number;
    name: string;
    total: number;
    reviews: number;
    payment_status: string;
    remarks: string;
  }[];
};

const LastFiveOrdersTable: React.FC<TableProps> = ({ orders }) => {
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
            orders.map((order, index) => {
              const paymentStatus = getPaymentStatus(order.payment_status);

              return (
                <TableRow key={index}>
                  <TableBodyCell>{order.date}</TableBodyCell>
                  <TableBodyCell>{order.orderId}</TableBodyCell>
                  <TableBodyCell>{order.name}</TableBodyCell>
                  <TableBodyCell>{order.total}</TableBodyCell>
                  <TableBodyCell>{order.reviews}</TableBodyCell>
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
    </TableContainer>
  );
};

export default LastFiveOrdersTable;
