import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { Pagination } from "../../../services/queries/accountsQueries";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
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
  isAdmin: boolean;
  clients: Client[];
  pagination: Pagination;
  selectedClients: Client[];
  setSelectedClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

const ClientsManagersTable: React.FC<TableProps> = ({
  clients,
  pagination,
  selectedClients,
  setSelectedClients,
  isAdmin,
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

  const isChecked = useCallback(
    (clientId: number) => {
      return selectedClients.some((client) => client.id === clientId);
    },
    [selectedClients]
  );

  const handleCheckAll = () => {
    if (selectedClients.length === 0) {
      setSelectedClients(clients);
      return;
    } else {
      setSelectedClients([]);
    }
  };

  const handleCheck = (selectedClient: Client) => {
    const index = selectedClients.findIndex(
      (client) => client.id === selectedClient.id
    );
    const newClients = [...selectedClients];

    if (index !== -1) {
      newClients.splice(index, 1);
    } else {
      newClients.push(selectedClient);
    }

    setSelectedClients(newClients);
  };

  const handleRowClick = (clientId: number) => {
    navigate({
      to: "/clients/clients_manager/$clientId",
      params: { clientId },
    });
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
            {isAdmin && (
              <TableHeadCell>
                <input
                  id="checkAll"
                  aria-describedby="checkAll"
                  name="checkAll"
                  type="checkbox"
                  checked={selectedClients.length > 0}
                  onChange={handleCheckAll}
                  className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
                />
              </TableHeadCell>
            )}
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
          {clients.map((client, index) => {
            return (
              <TableRow
                key={index}
                onClick={() => handleRowClick(client.id)}
                className="cursor-pointer"
              >
                {isAdmin && (
                  <TableBodyCell>
                    <input
                      id={`client-${client.id}`}
                      aria-describedby={`client-${client.id}`}
                      name={`client-${client.id}`}
                      type="checkbox"
                      checked={isChecked(client.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheck(client);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
                    />
                  </TableBodyCell>
                )}
                <TableBodyCell className="text-center">
                  {client.id}
                </TableBodyCell>
                <TableBodyCell className="text-center">
                  {client.email}
                </TableBodyCell>
                <TableBodyCell className="text-center">
                  {client.name}
                </TableBodyCell>
                <TableBodyCell className="text-center">
                  {dayjs(client?.createdAt).local().format("MM-DD-YYYY")}
                </TableBodyCell>
              </TableRow>
            );
          })}
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
