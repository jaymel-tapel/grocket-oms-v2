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

const COLUMNS = ["BUSINESS NAME", "RATING", "PHONE", "WEBSITE", "EMAIL(S)"];
const itemsPerPage = 10;

const SelectedProspectsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { step, selectedProspects, prospectsEmails } =
    useFindProspectsContext();

  const paginatedProspects = useMemo(() => {
    const lastProspectIndex = currentPage * itemsPerPage;
    const firstProspectIndex = lastProspectIndex - itemsPerPage;

    return selectedProspects.slice(firstProspectIndex, lastProspectIndex);
  }, [selectedProspects, currentPage]);

  const handlePageChange = useCallback(
    (value: number | PaginationNavs) => {
      if (typeof value === "number") {
        setCurrentPage(value);
        return;
      }

      const lastPage = Math.ceil(selectedProspects.length / itemsPerPage);

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
    [currentPage, selectedProspects]
  );
  console.log(selectedProspects);
  console.log(prospectsEmails);
  const showEmails = useCallback(
    (index: number) => {
      const status = prospectsEmails[index]?.status;
      if (status === "queued" && step === 3) {
        return "Queued";
      } else if (status === "pending") {
        return "In Progress";
      } else if (status === "success") {
        if (prospectsEmails[index].emails.length === 0) return "None";
        return prospectsEmails[index].emails.join(", ");
      } else if (status === "error") {
        return "Error";
      } else {
        return "Skipped";
      }
    },
    [prospectsEmails, step]
  );

  useEffect(() => {
    if (
      prospectsEmails.every(
        (email) => email.status === "success" || email.status === "error"
      )
    ) {
      handlePageChange("next");
    }
    //eslint-disable-next-line
  }, [prospectsEmails, handlePageChange]);

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
            return (
              <TableRow key={index}>
                <TableBodyCell>{prospect.businessName}</TableBodyCell>
                <TableBodyCell>{prospect.rating}</TableBodyCell>
                <TableBodyCell className="text-grBlue-dark whitespace-nowrap">
                  {prospect.phone}
                </TableBodyCell>
                <TableBodyCell className="text-grBlue-dark max-w-[18rem] whitespace-nowrap overflow-hidden text-ellipsis">
                  {prospect.website}
                </TableBodyCell>
                <TableBodyCell
                  className={`${
                    prospectsEmails[index]?.emails?.length > 0 &&
                    "text-grBlue-dark"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    {prospectsEmails[index]?.status === "pending" && (
                      <Spinner />
                    )}
                    {showEmails(index)}
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
        totalItems={selectedProspects.length}
        itemsPerPage={itemsPerPage}
        isFrontEndPagination={true}
      />
    </TableContainer>
  );
};

export default SelectedProspectsTable;
