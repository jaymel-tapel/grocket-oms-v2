import StarIconOutline from "@heroicons/react/24/outline/StarIcon";
import StarIconSolid from "@heroicons/react/24/solid/StarIcon";

import React from "react";

type StarIconsProps = {
  totalStars?: number;
  stars: number;
  value?: number | null;
  showLabels: boolean;
};

const StarsIcons: React.FC<StarIconsProps> = ({
  totalStars = 5,
  stars = 0,
  value = null,
  showLabels = true,
}) => {
  return (
    <div
      className={`w-fit grid gap-4 ${
        showLabels ? "grid-cols-3" : "grid-cols-1"
      }`}
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: totalStars }, (_, index) => {
          return (
            <React.Fragment key={index}>
              {stars > index ? (
                <StarIconSolid className="h-5 w-5 text-yellow-500" />
              ) : (
                <StarIconOutline className="h-5 w-5 text-yellow-500" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {showLabels && (
        <>
          <span className="font-medium whitespace-nowrap">{`${stars}${
            stars === 1 ? " Star: " : " Stars: "
          }`}</span>
          <span className="text-right">{value ?? 0}</span>
        </>
      )}
    </div>
  );
};

export default StarsIcons;
