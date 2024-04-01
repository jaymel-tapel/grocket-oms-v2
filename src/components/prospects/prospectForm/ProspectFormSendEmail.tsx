import { useState } from "react";
import { useSendColdEmail } from "../../../services/queries/prospectsQueries";
import { Button } from "../../tools/buttons/Button";
import Spinner from "../../tools/spinner/Spinner";

type Template = {
  id: number;
  name: string;
};

type Props = {
  templates: Template[];
  prospectId: number;
};

const ProspectFormSendEmail: React.FC<Props> = ({ templates, prospectId }) => {
  const [template, setTemplate] = useState(0);
  const { mutateAsync, isPending } = useSendColdEmail();

  const handleSend = () => {
    mutateAsync({
      prospectId,
      payload: { templateId: template },
    });
  };

  return (
    <div className="p-8 bg-white flex flex-wrap gap-4 justify-between items-center shadow-md">
      <div className="flex flex-col">
        <span className="font-semibold">Send Email Manually</span>
        <span className="text-xs text-gray-400">
          Select an email template to send an email manually
        </span>
      </div>
      <div className="w-full mt-2 grid grid-cols-2 items-center gap-8">
        <div>
          <select
            id="industryId"
            autoComplete="off"
            value={template}
            onChange={(e) => setTemplate(parseInt(e.target.value))}
            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          >
            <option disabled value={0}>
              Select Template
            </option>
            {templates?.map((template, index) => {
              return (
                <option value={template.id} key={index}>
                  {template.name}
                </option>
              );
            })}
          </select>
        </div>

        <Button
          type="button"
          variant={"lightBlue"}
          disabled={isPending || template === 0}
          onClick={handleSend}
        >
          {isPending ? (
            <>
              <Spinner /> Sending...
            </>
          ) : (
            "Send Cold Email"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProspectFormSendEmail;
