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
      className={`py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-400 sm:pl-0 ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHeadCell;
