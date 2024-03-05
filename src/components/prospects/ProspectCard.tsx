import React from "react";
import { SavedProspect } from "../../services/queries/prospectsQueries";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "../../utils/utils";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

type Props = {
  prospect: SavedProspect;
};

const ProspectCard: React.FC<Props> = ({ prospect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: prospect.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className={cn(
        "bg-white flex flex-col shadow-md",
        isDragging && "opacity-50"
      )}
    >
      <span className="px-6 pt-6 font-bold">{prospect.businessName}</span>
      <div className="px-6 pb-6 pt-4 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <StarIcon className="text-[#8A99AF] h-4 w-4" />
          <span className="text-[#8A99AF] text-sm">{prospect.rating}</span>
        </div>
        <div className="flex gap-4 items-center">
          <PhoneIcon className="text-[#8A99AF] h-4 w-4" />
          <span className="text-[#8A99AF] text-sm">{prospect.phone}</span>
        </div>
        <div className="flex gap-4 items-center">
          <GlobeAltIcon className="text-[#8A99AF] h-4 w-4" />
          <span className="text-[#8A99AF] text-sm">{prospect.mapsUrl}</span>
        </div>
        <div className="flex gap-4 items-center">
          <EnvelopeIcon className="text-[#8A99AF] h-4 w-4" />
          <span className="text-[#8A99AF] text-sm">{prospect.email}</span>
        </div>
      </div>
      {prospect.notes && (
        <div className="px-6 py-4 bg-[#AAAAAA] text-sm flex flex-col">
          <span className="text-white">Note:</span>

          <span className="text-white">{prospect.notes}</span>
        </div>
      )}
    </div>
  );
};

export default ProspectCard;
