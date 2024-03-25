import { useState } from "react";
import { Button } from "../../tools/buttons/Button";
import "./ProspectFormLeadStatus.scss";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useUpdateProspectDetails } from "../../../services/queries/prospectsQueries";

type Template = {
  id: number;
  name: string;
};

type Props = {
  templates: Template[];
  initialTemplate: Template;
  prospectId: number;
};

const ProspectFormLeadStatus: React.FC<Props> = ({
  templates,
  initialTemplate,
  prospectId,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<Template | undefined>(
    initialTemplate
  );
  const { mutateAsync } = useUpdateProspectDetails();

  const handleSelect = (template: Template) => {
    setActiveTemplate(template);
    setOpen(false);
    mutateAsync({
      prospectId,
      payload: { templateId: template.id },
    });
  };

  return (
    <div className="p-8 bg-white flex flex-col gap-4 justify-between shadow-md">
      <div className="flex flex-col">
        <span className="font-semibold">Lead Status</span>
        <span className="text-xs text-gray-400">
          Status will automatically update after sending cold email
        </span>
      </div>

      {/* -- fancy dropdown -- */}
      <div className="relative w-[200px]">
        <Button
          // value={templateId ?? 1}
          // className="relative lead-status-dropdown text-white bg-none bg-grBlue-light inline-flex self-start gap-x-2 items-center rounded-md py-2.5 px-5 border-0 justify-center text-sm whitespace-nowrap"
          type="button"
          variant={"lightBlue"}
          className="p-0 gap-0"
          onClick={() => setOpen(!open)}
        >
          <span className="px-4 py-2.5">
            {activeTemplate?.name || initialTemplate.name}
          </span>
          <div className="h-full flex items-center px-2.5 border-l border-l-2 border-l-white">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </Button>
        {open && (
          <div className="absolute overflow-hidden w-full mt-1 rounded-md bg-white divide-y divide-gray-300 border border-gray-300">
            {templates.map((template, index) => {
              const isActive = template.id === initialTemplate.id;

              return (
                <div
                  key={index}
                  className={`cursor-pointer text-sm p-2 pl-4 hover:bg-grBlue-light hover:text-white ${
                    isActive && "bg-grBlue-light text-white"
                  }`}
                  onClick={() => handleSelect(template)}
                >
                  {template.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProspectFormLeadStatus;
