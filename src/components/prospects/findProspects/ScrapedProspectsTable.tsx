import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { useFindProspectsContext } from "./FindProspectsContext";
// import { useIsMutating } from "@tanstack/react-query";
import Spinner from "../../tools/spinner/Spinner";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import TotalResultsLabel from "./TotalResultsLabel";

const COLUMNS = ["BUSINESS NAME", "RATING", "PHONE", "WEBSITE", "STATUS"];
const itemsPerPage = 10;

type TableProps = {
  // pagination: Pagination;
};

const ScrapedProspectsTable: React.FC<TableProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    step,
    prospects,
    // setProspects,
    // selectedProspects,
    // setSelectedProspects,
    // setProspectsEmail,
  } = useFindProspectsContext();

  const paginatedProspects = useMemo(() => {
    const lastProspectIndex = currentPage * itemsPerPage;
    const firstProspectIndex = lastProspectIndex - itemsPerPage;

    return prospects.slice(firstProspectIndex, lastProspectIndex);
  }, [prospects, currentPage]);

  const showWebsite = useCallback(
    (status?: string) => {
      if (status === "queued" && step === 3) {
        return "Queued";
      } else if (status === "pending") {
        return "In Progress";
      } else if (status === "success") {
        return "Success";
      } else if (status === "error") {
        return "Error";
      } else {
        return "Skipped";
      }
    },
    [step]
  );

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

  // const isMutating = useIsMutating({ mutationKey: ["scrape-prospects"] });

  // useEffect(() => {
  //   if (isMutating) {
  //     setProspects([]);
  //     // setSelectedProspects([]);
  //     setProspectsEmail([]);
  //   }
  //   //eslint-disable-next-line
  // }, [isMutating]);

  useEffect(() => {
    if (prospects.some((prospect) => prospect.status === "queued")) {
      if (
        paginatedProspects.every(
          (prospect) =>
            prospect.status === "success" || prospect.status === "error"
        )
      ) {
        handlePageChange("next");
      }
    }
    // eslint-disable-next-line
  }, [paginatedProspects, handlePageChange]);

  // const isChecked = useCallback(
  //   (prospectId: number) => {
  //     return selectedProspects.some((prospect) => prospect.id === prospectId);
  //   },
  //   [selectedProspects]
  // );

  // const handleCheckAll = () => {
  //   if (selectedProspects.length === 0) {
  //     setSelectedProspects(prospects);
  //     return;
  //   } else {
  //     setSelectedProspects([]);
  //   }
  // };

  // const handleCheck = (selectedProspect: Prospect) => {
  //   const index = selectedProspects.findIndex(
  //     (prospect) => prospect.id === selectedProspect.id
  //   );
  //   const newProspects = [...selectedProspects];

  //   if (index !== -1) {
  //     newProspects.splice(index, 1);
  //   } else {
  //     newProspects.push(selectedProspect);
  //   }

  //   setSelectedProspects(newProspects);
  // };

  return (
    <TableContainer shadowOff={true}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableHeadCell>
              <input
                id="checkAll"
                aria-describedby="checkAll"
                name="checkAll"
                type="checkbox"
                checked={selectedProspects.length > 0}
                onChange={handleCheckAll}
                className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
              />
            </TableHeadCell> */}
            {COLUMNS.map((col, index) => (
              <TableHeadCell key={index}>{col}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {isMutating ? (
            <TableRow>
              <TableBodyCell className="py-8" colSpan={5}>
                <Spinner className="h-8 w-8 mx-auto" />
              </TableBodyCell>
            </TableRow>
          ) : null} */}
          {paginatedProspects.map((prospect, index) => {
            return (
              <TableRow key={index}>
                {/* <TableBodyCell>
                  <input
                    id={`prospect-${prospect.id}`}
                    aria-describedby={`prospect-${prospect.id}`}
                    name={`prospect-${prospect.id}`}
                    type="checkbox"
                    checked={isChecked(prospect.id)}
                    onChange={() => handleCheck(prospect)}
                    className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
                  />
                </TableBodyCell> */}
                <TableBodyCell>{prospect.name}</TableBodyCell>
                <TableBodyCell>{prospect.rating}</TableBodyCell>
                <TableBodyCell className="text-grBlue-dark whitespace-nowrap">
                  {prospect.phone}
                </TableBodyCell>
                <TableBodyCell
                  className={`max-w-[18rem] whitespace-nowrap overflow-hidden text-ellipsis text-grBlue-dark`}
                >
                  <div className="flex gap-2 items-center">
                    {prospect.url ?? ""}
                  </div>
                </TableBodyCell>
                <TableBodyCell
                  className={`max-w-[18rem] whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  <div className="flex gap-2 items-center">
                    {prospect.status === "pending" && <Spinner />}
                    {showWebsite(prospect.status)}
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

export default ScrapedProspectsTable;
