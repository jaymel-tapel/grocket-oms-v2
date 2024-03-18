import React, { useEffect, useState } from "react";
import { SavedProspect } from "../../services/queries/prospectsQueries";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "../../utils/utils";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../tools/collapsible/Collapsible";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDragging) {
      setIsOpen(false);
    }
  }, [isDragging]);

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
      <div className="px-6 pt-6 flex justify-between w-full gap-4 items-center">
        <span className="font-bold truncate">{prospect.businessName}</span>
        <button type="button">
          <DotsHorizontalIcon className="h-4 w-4 pointer-events-none" />
        </button>
      </div>
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
        <div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="text-[#8A99AF] text-sm w-full flex gap-4 items-center relative"
              >
                <EnvelopeIcon className="shrink-0 text-[#8A99AF] h-4 w-4 pointer-events-none" />
                {prospect.emails.length > 1 && (
                  <span className="h-3 w-3 absolute flex items-center justify-center top-2.5 left-2 text-[0.5rem] font-medium bg-white border border-[#8A99AF] rounded-full pointer-events-none">
                    {prospect.emails.length}
                  </span>
                )}
                <span className="truncate pointer-events-none">
                  {prospect.emails[0] ?? ""}
                </span>
                {prospect.emails.length > 1 &&
                  (isOpen ? (
                    <ChevronUpIcon className="ml-auto shrink-0 h-4 w-4 pointer-events-none" />
                  ) : (
                    <ChevronDownIcon className="ml-auto shrink-0 h-4 w-4 pointer-events-none" />
                  ))}
              </button>
            </CollapsibleTrigger>
            {prospect.emails.length > 1 && (
              <CollapsibleContent>
                <div className="flex flex-col gap-2 mt-2">
                  {prospect.emails.map((email, index) => {
                    if (index === 0) return;

                    return (
                      <span key={index} className="ml-8 text-[#8A99AF] text-sm">
                        {email}
                      </span>
                    );
                  })}
                </div>
              </CollapsibleContent>
            )}
          </Collapsible>
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
