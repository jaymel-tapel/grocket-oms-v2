import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/tools/buttons/Button";
import { ProspectColumn } from "../../services/queries/prospectsQueries";
import { useMemo, useState } from "react";
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

const PROSPECTS: ProspectColumn[] = [
  {
    id: "A",
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
        emails: ["testasdasdasdasdasdasdasdasdasdasdasd@gmail.com"],
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
        emails: ["test@gmail.com"],
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
        emails: ["test@gmail.com"],
      },
    ],
  },
  {
    id: "B",
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
        emails: ["test@gmail.com", "test2@gmail.com", "test3@gmail.com"],
      },
    ],
  },
  {
    id: "C",
    name: "Sent Follow Up 1",
    items: [],
  },
  {
    id: "D",
    name: "Sent Follow Up 2",
    items: [],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [activeItemId, setActiveItemId] = useState<null | number>(null);
  const [mockProspects, setMockProspects] =
    useState<ProspectColumn[]>(PROSPECTS);

  const activeProspect = useMemo(() => {
    if (!activeItemId) return undefined;

    for (const column of mockProspects) {
      for (const item of column.items) {
        if (item.id === activeItemId) {
          return item;
        }
      }
    }
    return undefined;
  }, [activeItemId, mockProspects]);

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

    setActiveItemId(null);
  };

  const sensors = useSensors(
    useSensor(SmartPointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 5000,
        tolerance: 6,
      },
    }),
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
        <div className="mt-6 flex gap-8">
          {mockProspects.map((column) => {
            return <ProspectCardsContainer key={column.id} column={column} />;
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
