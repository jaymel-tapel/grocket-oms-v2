import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/tools/buttons/Button";
import { ProspectColumn } from "../../services/queries/prospectsQueries";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ProspectCardsContainer from "../../components/prospects/ProspectCardsContainer";

const PROSPECTS: ProspectColumn[] = [
  {
    id: 1,
    name: "New",
    items: [
      {
        id: 1,
        businessName: "Test Prospect",
        rating: "3.5",
        reviews: "50",
        phone: "+123456789",
        mapsUrl: "https://testbusiness.com",
        website: "john@testbusiness.com",
        notes: "",
      },
      {
        id: 2,
        businessName: "Test Prospect",
        rating: "3.5",
        reviews: "50",
        phone: "+123456789",
        mapsUrl: "https://testbusiness.com",
        website: "john@testbusiness.com",
        notes: "",
      },
      {
        id: 3,
        businessName: "Test Prospect",
        rating: "3.5",
        reviews: "50",
        phone: "+123456789",
        mapsUrl: "https://testbusiness.com",
        website: "john@testbusiness.com",
        notes: "",
      },
    ],
  },
  {
    id: 2,
    name: "Sent Cold Email",
    items: [
      {
        id: 4,
        businessName: "Test Prospect",
        rating: "3.5",
        reviews: "50",
        phone: "+123456789",
        mapsUrl: "https://testbusiness.com",
        website: "john@testbusiness.com",
        notes: "This is a note",
      },
    ],
  },
  {
    id: 3,
    name: "Sent Follow Up 1",
    items: [],
  },
  {
    id: 4,
    name: "Sent Follow Up 2",
    items: [],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [mockProspects, setMockProspects] =
    useState<ProspectColumn[]>(PROSPECTS);

  const findColumn = (id: UniqueIdentifier | undefined) => {
    if (!id) {
      return null;
    }
    if (mockProspects.some((c) => c.id === id)) {
      return mockProspects.find((c) => c.id === id) ?? null;
    }
    const itemWithColumnId = mockProspects.flatMap((c) => {
      const columnId = c.id;
      return c.items.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return mockProspects.find((c) => c.id === columnId) ?? null;
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
    setMockProspects((prevState) => {
      const activeItems = activeColumn.items;
      const overItems = overColumn.items;
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
          c.items = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.items = [
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over ? over.id : undefined;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }

    const activeIndex = activeColumn.items.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.items.findIndex((i) => i.id === overId);

    if (activeIndex !== overIndex) {
      setMockProspects((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.items = arrayMove(overColumn.items, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
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
        // onDragStart={handleDragStart}
        // onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-8">
          {mockProspects.map((column) => {
            return <ProspectCardsContainer key={column.id} column={column} />;
          })}
        </div>
      </DndContext>
    </div>
  );
};

export default Index;
