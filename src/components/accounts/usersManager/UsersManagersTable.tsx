import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { User } from "../../../services/queries/accountsQueries";
import { Link } from "@tanstack/react-router";

const COLUMNS = ["ID", "EMAIL", "NAME", "ROLE", "ACTION"];

type TableProps = {
  users: User[];
};

const UsersManagersTable: React.FC<TableProps> = ({ users }) => {
  return (
    <>
      <TableContainer className="bg-white">
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((col, index) => (
                <TableHeadCell className="text-center" key={index}>
                  {col}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableBodyCell className="text-center">{user.id}</TableBodyCell>
                <TableBodyCell className="text-center">
                  {user.email}
                </TableBodyCell>
                <TableBodyCell className="text-center">
                  {user.name}
                </TableBodyCell>
                <TableBodyCell className="text-center capitalize">
                  {user.role.toLocaleLowerCase()}
                </TableBodyCell>
                <TableBodyCell className="text-center">
                  <Link
                    to="/accounts/users_manager/$userId"
                    params={{ userId: user.id }}
                    className="text-blue-500"
                  >
                    View
                  </Link>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersManagersTable;
