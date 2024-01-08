import React, { ReactNode } from "react";

interface IsProps {
  children?: ReactNode;
  className?: string;
}

const TableContainer: React.FC<IsProps> = ({ children, className = "" }) => {
  return (
    <div className={`${className} border focus:outline-none shadow-md `}>
      {children}
    </div>
  );
};

export default TableContainer;
