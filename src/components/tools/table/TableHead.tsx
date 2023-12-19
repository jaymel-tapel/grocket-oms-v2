import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  classname?: string;
}

const TableHead: React.FC<IsProps> = ({ children, classname = "" }) => {
  return <thead className={`${classname}bg-white`}>{children}</thead>;
};

export default TableHead;
