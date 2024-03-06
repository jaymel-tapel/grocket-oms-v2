import React from "react";
import { ProspectColumn } from "../../services/queries/prospectsQueries";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import ProspectCard from "./ProspectCard";

type Props = {
  column: ProspectColumn;
};

const ProspectCardsContainer: React.FC<Props> = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <SortableContext items={column.items} strategy={rectSortingStrategy}>
      <div
        // {...attributes}
        ref={setNodeRef}
        // style={{
        //   transition,
        //   transform: transform
        //     ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        //     : undefined,
        // }}
        className="w-full max-w-[300px]"
      >
        <h2 className="text-lg font-bold">{column.name}</h2>
        <div className="mt-4 flex flex-col gap-4">
          {column.items.map((prospect) => (
            <ProspectCard key={prospect.id} prospect={prospect} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default ProspectCardsContainer;
