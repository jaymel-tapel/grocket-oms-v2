import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Pagination } from "../../../services/queries/accountsQueries";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Client } from "../../../services/queries/clientsQueries";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";

const COLUMNS = [
  "ID",
  "EMAIL",
  "NAME",
  "ORDERS",
  "TOTAL AMOUNT",
  "DATE REGISTERED",
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
      to: "/clients/clients_manager",
      search: ({ searchClients }) => ({
        searchClients: {
          ...searchClients,
          page: currentPage,
          perPage: itemsPerPage,
        },
      }),
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
              <TableBodyCell className="text-center capitalize">
                1
              </TableBodyCell>
              <TableBodyCell className="text-center">$149</TableBodyCell>
              <TableBodyCell className="text-center">
                {client.createdAt}
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
