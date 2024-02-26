import React from "react";
import { SavedProspect } from "../../services/queries/prospectsQueries";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "../../utils/utils";

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
        "p-4 bg-white flex flex-col gap-4",
        isDragging && "opacity-50"
      )}
    >
      <span>{prospect.businessName}</span>
      <span>{prospect.rating}</span>
      <span>{prospect.phone}</span>
      <span>{prospect.website}</span>
    </div>
  );
};

export default ProspectCard;
