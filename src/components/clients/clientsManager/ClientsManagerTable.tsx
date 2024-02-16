import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Pagination } from "../../../services/queries/accountsQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Client } from "../../../services/queries/clientsQueries";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";

dayjs.extend(utc);

const COLUMNS = [
  "ID",
  "EMAIL",
  "NAME",
  // "ORDERS",
  // "TOTAL AMOUNT",
  "DATE REGISTERED",
  "ACTIONS",
];

const itemsPerPage = 10;

type TableProps = {
  clients: Client[];
  pagination: Pagination;
};

const ClientsManagersTable: React.FC<TableProps> = ({
  clients,
  pagination,
}) => {
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
          {clients.length === 0 && (
            <TableRow>
              <TableBodyCell className="text-center text-gray-500" colSpan={6}>
                No data found.
              </TableBodyCell>
            </TableRow>
          )}
          {clients.map((client, index) => (
            <TableRow key={index}>
              <TableBodyCell className="text-center">{client.id}</TableBodyCell>
              <TableBodyCell className="text-center">
                {client.email}
              </TableBodyCell>
              <TableBodyCell className="text-center">
                {client.name}
              </TableBodyCell>
              {/* <TableBodyCell className="text-center capitalize">
                1 
              </TableBodyCell>
              <TableBodyCell className="text-center">$149</TableBodyCell> */}
              <TableBodyCell className="text-center">
                {dayjs(client?.createdAt).local().format("MM-DD-YYYY")}
              </TableBodyCell>
              <TableBodyCell className="text-center">
                <Link
                  to="/clients/clients_manager/$clientId"
                  params={{ clientId: client.id }}
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

export default ClientsManagersTable;
