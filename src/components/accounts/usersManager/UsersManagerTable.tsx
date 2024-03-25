import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Pagination, User } from "../../../services/queries/accountsQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";

const COLUMNS = ["ID", "EMAIL", "NAME", "ROLE", "ACTION"];
const itemsPerPage = 10;

type TableProps = {
  users: User[];
  pagination: Pagination;
};

const UsersManagerTable: React.FC<TableProps> = ({ users, pagination }) => {
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

  return (
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
          {users.length === 0 && (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={5}>
                No data found.
              </TableBodyCell>
            </TableRow>
          )}
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableBodyCell className="text-center">{user.id}</TableBodyCell>
              <TableBodyCell className="text-center">
                {user.email}
              </TableBodyCell>
              <TableBodyCell className="text-center">{user.name}</TableBodyCell>
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

export default UsersManagerTable;
