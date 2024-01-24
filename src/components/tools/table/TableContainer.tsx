import React, { ReactNode } from "react";

interface IsProps {
  children?: ReactNode;
  className?: string;
  shadowOff?: boolean;
}

const TableContainer: React.FC<IsProps> = ({
  children,
  className = "",
  shadowOff = false,
}) => {
  return (
    <div
      className={`${className} bg-white border-x border-t focus:outline-none ${
        shadowOff ? "" : "shadow-md"
      }`}
    >
      {children}
    </div>
  );
};

export default TableContainer;
