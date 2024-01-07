import React from "react";
import Table from "../../tools/table/Table";
import TableHead from "../../tools/table/TableHead";
import TableRow from "../../tools/table/TableRow";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";

const COLUMNS = ["ID", "COMPANY NAME", "URL", "ACTION"];

type CompanyLinksTableProps = {
  companies: {
    id: number;
    // status: number,
    // created_at: string,
    // updated_at: string,
    name: string;
    // latest_check: 0,
    // check_url: 1,
    valid_url: number;
    url: string;
    client_id: number;
  }[];
};

const CompanyLinksTable: React.FC<CompanyLinksTableProps> = ({ companies }) => {
  return (
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
  );
};

export default CompanyLinksTable;
