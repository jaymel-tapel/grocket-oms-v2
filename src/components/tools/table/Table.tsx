import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  classname?: string;
}

const Table: React.FC<IsProps> = ({ children, classname = "" }) => {
  return (
    <div className="mt-8 flow-root overflow-auto">
      <div className="mx-auto">
        <table
          className={`${classname} min-w-full border-y border-y-gray-300 divide-y divide-gray-300`}
        >
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;
