import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  scope?: string;
  className?: string;
}

const TableHeadCell: React.FC<IsProps> = ({
  children,
  scope = "",
  className = "",
}) => {
  return (
    <th
      scope={`col ${scope}`}
      className={`p-4 text-left text-sm font-medium text-[#64748B] whitespace-nowrap ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHeadCell;
