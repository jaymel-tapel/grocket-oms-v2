import React from "react";
import Table from "../../tools/table/Table";
import TableHead from "../../tools/table/TableHead";
import TableRow from "../../tools/table/TableRow";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";

const COLUMNS = ["ID", "COMPANY NAME", "URL", "ACTION"];

type CompanyLinksTableProps = {
  companies: {
    id?: number;
    name: string;
    url: string;
    valid_url?: boolean;
  }[];
};

const CompanyLinksTable: React.FC<CompanyLinksTableProps> = ({ companies }) => {
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
                <TableBodyCell>{company.url}</TableBodyCell>
                {/* <TableBodyCell></TableBodyCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyLinksTable;
