import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../tools/buttons/Button";

type Props = {
  template: {
    name: string;
    subject: string;
    content: string;
  };
};

const EmailTemplateCard: React.FC<Props> = ({ template }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-slate-300 px-4 py-2 flex justify-between items-center">
        <span className="font-medium">{template.name}</span>
        <div className="flex items-center gap-2">
          <Button type="button" variant={"noBorder"} className="h-fit p-1">
            <PencilSquareIcon className="h-4 w-4 text-green-700" />
          </Button>
          <Button type="button" variant={"noBorder"} className="h-fit p-1">
            <TrashIcon className="h-4 w-4 text-red-700" />
          </Button>
        </div>
      </div>
      <div className="px-4 py-2 border-b border-[#bg-slate-300]">
        <span>Subject: {template.subject}</span>
      </div>
      <div
        className="px-4 py-2 [&>*:nth-child(1)]:line-clamp-6"
        dangerouslySetInnerHTML={{ __html: template.content }}
      />
    </div>
  );
};

export default EmailTemplateCard;
