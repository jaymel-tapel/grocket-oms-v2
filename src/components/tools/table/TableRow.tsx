import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const TableRow: React.FC<IsProps> = ({ children, className = "", onClick }) => {
  return (
    <tr className={`${className}`} onClick={() => (onClick ? onClick() : "")}>
      {children}
    </tr>
  );
};

export default TableRow;
