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
      className={`whitespace-nowrap p-4 text-sm text-[#333A48] ${className}`}
      onClick={() => (onClick ? onClick() : "")}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableBodyCell;
