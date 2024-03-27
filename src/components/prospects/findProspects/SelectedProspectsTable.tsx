import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { useFindProspectsContext } from "./FindProspectsContext";
import Spinner from "../../tools/spinner/Spinner";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import TotalResultsLabel from "./TotalResultsLabel";

const COLUMNS = ["BUSINESS NAME", "RATING", "PHONE", "WEBSITE", "EMAIL(S)"];
const itemsPerPage = 10;

const SelectedProspectsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { step, prospects, prospectsEmails } = useFindProspectsContext();

  const paginatedProspects = useMemo(() => {
    const lastProspectIndex = currentPage * itemsPerPage;
    const firstProspectIndex = lastProspectIndex - itemsPerPage;

    return prospects.slice(firstProspectIndex, lastProspectIndex);
  }, [prospects, currentPage]);

  const paginatedEmails = useMemo(() => {
    const lastProspectIndex = currentPage * itemsPerPage;
    const firstProspectIndex = lastProspectIndex - itemsPerPage;

    return prospectsEmails.slice(firstProspectIndex, lastProspectIndex);
  }, [prospectsEmails, currentPage]);

  const handlePageChange = useCallback(
    (value: number | PaginationNavs) => {
      if (typeof value === "number") {
        setCurrentPage(value);
        return;
      }

      const lastPage = Math.ceil(prospects.length / itemsPerPage);

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
    },
    [currentPage, prospects]
  );

  const showEmails = useCallback(
    (prospectId: number) => {
      const email = prospectsEmails.find((email) => email.id === prospectId);
      if (!email) return "";

      const status = email.status;

      if (status === "queued" && step === 4) {
        return "Queued";
      } else if (status === "pending") {
        return "In Progress";
      } else if (status === "success") {
        if (email.emails.length === 0) return "None";
        return email.emails.join(", ");
      } else if (status === "error") {
        return "Error";
      } else {
        return "Skipped";
      }
    },
    [prospectsEmails, step]
  );

  useEffect(() => {
    if (prospectsEmails.some((email) => email.status === "queued")) {
      if (
        paginatedEmails.every(
          (email) => email.status === "success" || email.status === "error"
        )
      ) {
        handlePageChange("next");
      }
    }
    //eslint-disable-next-line
  }, [prospectsEmails, paginatedEmails, handlePageChange]);

  useEffect(() => {
    if (step === 5) {
      handlePageChange("last");
    }
    //eslint-disable-next-line
  }, [step]);

  return (
    <TableContainer shadowOff={true}>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((col, index) => (
              <TableHeadCell key={index}>{col}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProspects.map((prospect, index) => {
            const email = prospectsEmails.find(
              (email) => email?.id === prospect?.id
            );
            return (
              <TableRow key={index}>
                <TableBodyCell>{prospect.name}</TableBodyCell>
                <TableBodyCell>{prospect.rating}</TableBodyCell>
                <TableBodyCell className="text-grBlue-dark whitespace-nowrap">
                  {prospect.phone}
                </TableBodyCell>
                <TableBodyCell className="text-grBlue-dark max-w-[18rem] whitespace-nowrap overflow-hidden text-ellipsis">
                  {prospect.url}
                </TableBodyCell>
                <TableBodyCell
                  className={`${
                    email && email?.emails?.length > 0 && "text-grBlue-dark"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    {email && email.status === "pending" && <Spinner />}
                    {showEmails(prospect.id)}
                  </div>
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalItems={prospects.length}
        itemsPerPage={itemsPerPage}
        isFrontEndPagination={true}
        customTotalLabel={<TotalResultsLabel />}
      />
    </TableContainer>
  );
};

export default SelectedProspectsTable;
