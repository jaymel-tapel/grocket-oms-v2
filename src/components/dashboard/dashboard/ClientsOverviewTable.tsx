import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";

const COLUMNS = ["NAME", "EMAIL", "INDUSTRY", "ORDERS", "AMOUNT", "DATE"];

type TableProps = {
  clients: {
    name: string;
    email: string;
    industry: string;
    order: number;
    amount: number;
    date: string;
  }[];
};

const ClientsOverviewTable: React.FC<TableProps> = ({ clients }) => {
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
          {clients.length === 0 ? (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={7}>
                No data found.
              </TableBodyCell>
            </TableRow>
          ) : (
            clients.map((client, index) => {
              return (
                <TableRow key={index}>
                  <TableBodyCell>{client.name}</TableBodyCell>
                  <TableBodyCell>{client.email}</TableBodyCell>
                  <TableBodyCell>{client.industry}</TableBodyCell>
                  <TableBodyCell>{client.order}</TableBodyCell>
                  <TableBodyCell>{client.amount}</TableBodyCell>
                  <TableBodyCell>{client.date}</TableBodyCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsOverviewTable;
