import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/tools/buttons/Button";
import {
  ProspectColumn,
  useGetMyProspects,
  useMoveProspect,
} from "../../services/queries/prospectsQueries";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ProspectCardsContainer from "../../components/prospects/ProspectCardsContainer";
import ProspectCard from "../../components/prospects/ProspectCard";
import { SmartPointerSensor } from "./DndSensor";

const Index = () => {
  const navigate = useNavigate();
  const [activeItemId, setActiveItemId] = useState<null | number>(null);
  const [myProspects, setMyProspects] = useState<ProspectColumn[]>([]);

  const { mutateAsync } = useMoveProspect();
  const { data } = useGetMyProspects();

  useEffect(() => {
    if (!data) {
      return;
    }

    const columns = data?.map((template, index) => {
      const stringId = String.fromCharCode(65 + index);

      return { ...template, id: stringId, templateId: template.id };
    });

    setMyProspects(columns);
  }, [data]);

  const activeProspect = useMemo(() => {
    if (!activeItemId) return undefined;

    for (const column of myProspects) {
      for (const item of column.prospects) {
        if (item.id === activeItemId) {
          return item;
        }
      }
    }
    return undefined;
  }, [activeItemId, myProspects]);

  const findColumn = (id: UniqueIdentifier | undefined) => {
    if (!id) {
      return null;
    }
    if (myProspects.some((c) => c.id === id)) {
      return myProspects.find((c) => c.id === id) ?? null;
    }
    const itemWithColumnId = myProspects.flatMap((c) => {
      const columnId = c.id;
      return c.prospects.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return myProspects.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = active.id;
    const overId = over ? over.id : undefined;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setMyProspects((prevState) => {
      const activeItems = activeColumn.prospects;
      const overItems = overColumn.prospects;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.prospects = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.prospects = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItemId(active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over ? over.id : undefined;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      setActiveItemId(null);
      return null;
    }

    const activeIndex = activeColumn.prospects.findIndex(
      (i) => i.id === activeId
    );
    const overIndex = overColumn.prospects.findIndex((i) => i.id === overId);

    if (activeIndex !== overIndex) {
      setMyProspects((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.prospects = arrayMove(
              overColumn.prospects,
              activeIndex,
              overIndex
            );
            return column;
          } else {
            return column;
          }
        });
      });
    }

    // Update my prospect db
    const newProspectIds = overColumn.prospects.map((prospect) => prospect.id);
    newProspectIds.splice(overIndex, 0, activeId as number);

    mutateAsync({
      templateId: overColumn.templateId,
      payload: { newProspectIds: JSON.stringify(newProspectIds) },
    });

    setActiveItemId(null);
  };

  const sensors = useSensors(
    useSensor(SmartPointerSensor, {
      activationConstraint: {
        // delay: 5000,
        // tolerance: 6,
        distance: 0.01,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleNavigate = () => {
    navigate({ to: "/find-prospects" });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="button" onClick={handleNavigate}>
          Find Prospects
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        // onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="mt-6 flex gap-8 overflow-x-auto overflow-y-hidden">
          {myProspects.map((column) => {
            return (
              <div key={column.id} className="max-w-[300px] w-full">
                <ProspectCardsContainer column={column} />
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeProspect && <ProspectCard prospect={activeProspect} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Index;
