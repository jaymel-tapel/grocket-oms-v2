import { useCallback } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import { useFindProspectsContext } from "./FindProspectsContext";
import Spinner from "../../tools/spinner/Spinner";

const COLUMNS = ["BUSINESS NAME", "RATING", "PHONE", "WEBSITE", "EMAIL(S)"];

const SelectedProspectsTable = () => {
  const { selectedProspects, prospectsEmails } = useFindProspectsContext();

  const showEmails = useCallback(
    (index: number) => {
      const status = prospectsEmails[index]?.status;

      if (status === "queued") {
        return "Queued";
      } else if (status === "pending") {
        return "In Progress";
      } else if (status === "success") {
        if (prospectsEmails[index].emails.length === 0) return "None";
        return prospectsEmails[index].emails.join(", ");
      } else if (status === "error") {
        return "Error";
      } else {
        return "";
      }
    },
    [prospectsEmails]
  );

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
          {selectedProspects.map((prospect, index) => {
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
      {/* <TablePagination
        prospectsShown={prospectsShown}
        pagination={pagination}
      /> */}
    </TableContainer>
  );
};

export default SelectedProspectsTable;
