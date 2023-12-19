import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  colSpan?: number;
}

const TableBodyCell: React.FC<IsProps> = ({
  children,
  className = "",
  onClick,
  colSpan = 1,
}) => {
  return (
    <td
      className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0 ${className}`}
      onClick={() => (onClick ? onClick() : "")}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableBodyCell;
