import { ReactNode } from "react";

interface IsProps {
  children?: ReactNode;
  classname?: string;
  leftTitle?: string;
  rightTitle?: string;
}

const TableTitle: React.FC<IsProps> = ({
  children,
  classname = "",
  leftTitle,
  rightTitle,
}) => {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${classname}`}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base mt-6 font-semibold leading-6 text-gray-900">
            {leftTitle}
          </h1>
        </div>
        {children}
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <span className="text-sm hover:text-black">{rightTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
