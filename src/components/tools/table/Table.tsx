import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  classname?: string;
}

const Table: React.FC<IsProps> = ({ children, classname = "" }) => {
  return (
    <div className="flow-root overflow-auto">
      <div className="mx-auto">
        <table className={`${classname} min-w-full divide-y divide-gray-300`}>
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;
