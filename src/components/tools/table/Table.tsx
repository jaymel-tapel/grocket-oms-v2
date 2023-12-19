import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  classname?: string;
}

const Table: React.FC<IsProps> = ({ children, classname = "" }) => {
  return (
    <div className="mt-8  flow-root overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table className={`${classname}min-w-full divide-y divide-gray-300`}>
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;
