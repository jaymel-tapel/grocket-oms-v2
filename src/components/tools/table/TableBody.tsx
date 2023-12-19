import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  classname?: string;
}

const TableBody: React.FC<IsProps> = ({ children, classname = "" }) => {
  return (
    <tbody className={`${classname}divide-y divide-gray-200`}>{children}</tbody>
  );
};

export default TableBody;
