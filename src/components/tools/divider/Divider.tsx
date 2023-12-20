import React from "react";

type DividerProps = {
  direction: "vertical" | "horizontal";
};

const Divider: React.FC<DividerProps> = ({ direction }) => {
  const horizontalClasses = "border-t border-gray-300 my-4";
  const verticalClasses = "border-l border-gray-300 mx-2 flex flex-col";

  return (
    <div
      className={
        direction === "horizontal" ? horizontalClasses : verticalClasses
      }
    />
  );
};

export default Divider;
