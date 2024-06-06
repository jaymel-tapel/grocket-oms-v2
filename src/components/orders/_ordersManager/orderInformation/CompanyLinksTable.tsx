import React, { useState } from "react";
import Table from "../../../tools/table/Table";
import TableHead from "../../../tools/table/TableHead";
import TableRow from "../../../tools/table/TableRow";
import TableHeadCell from "../../../tools/table/TableHeadCell";
import TableBody from "../../../tools/table/TableBody";
import TableBodyCell from "../../../tools/table/TableBodyCell";
import TableContainer from "../../../tools/table/TableContainer";
import { useDeleteClientCompany } from "../../../../services/queries/clientsQueries";
import { TrashIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../tools/spinner/Spinner";

const COLUMNS = ["ID", "COMPANY NAME", "URL", "ACTION"];

type CompanyLinksTableProps = {
  companies: {
    id?: number;
    name: string;
    url: string;
    valid_url?: boolean;
  }[];
  handleDeleteLocal?: (index: number) => void;
  keyword: string;
  disableEdit?: boolean;
};

const CompanyLinksTable: React.FC<CompanyLinksTableProps> = ({
  companies,
  handleDeleteLocal,
  keyword,
  disableEdit = false,
}) => {
  const [identifier, setIdentifier] = useState<number | null>(null);

  const { mutateAsync: deleteCompany, isPending } = useDeleteClientCompany();

  const handleDeleteClick = async (
    companyId: number | undefined,
    index: number
  ) => {
    if (disableEdit) return;
    if (!window.confirm("Delete this company from client?")) return;

    if (companyId === undefined) {
      if (!handleDeleteLocal) return;

      handleDeleteLocal(index);
    } else {
      setIdentifier(companyId);
      await deleteCompany({ companyId, keyword });
    }

    setIdentifier(null);
  };

  return (
    <TableContainer className="border-x-0 shadow-none">
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((col, index) => {
              return <TableHeadCell key={index}>{col}</TableHeadCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company, index) => {
            return (
              <TableRow key={index}>
                <TableBodyCell>{company.id}</TableBodyCell>
                <TableBodyCell>{company.name}</TableBodyCell>
                <TableBodyCell className="text-grBlue-dark">
                  <a href={company.url} target="_blank" rel="noopener">
                    {company.url}
                  </a>
                </TableBodyCell>
                <TableBodyCell>
                  {identifier === company.id && isPending ? (
                    <Spinner />
                  ) : (
                    <TrashIcon
                      className={`h-4 w-4 text-red-500 ${
                        disableEdit && "cursor-pointer"
                      }}`}
                      onClick={() => handleDeleteClick(company.id, index)}
                    />
                  )}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyLinksTable;
