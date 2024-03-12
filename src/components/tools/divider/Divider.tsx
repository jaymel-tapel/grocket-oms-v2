import React from "react";

type DividerProps = {
  direction: "vertical" | "horizontal";
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ direction, className }) => {
  const horizontalClasses = "border-t border-gray-300 my-4";
  const verticalClasses = "border-l border-gray-300 mx-2 flex flex-col";

  return (
    <div
      className={`${
        direction === "horizontal" ? horizontalClasses : verticalClasses
      } ${className}`}
    />
  );
};

export default Divider;
