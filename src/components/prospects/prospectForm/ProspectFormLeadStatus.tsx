import { Button } from "../../tools/buttons/Button";

const ProspectFormLeadStatus = () => {
  return (
    <div className="p-8 bg-white flex flex-wrap gap-4 justify-between items-center shadow-md">
      <div className="flex flex-col">
        <span className="font-semibold">Lead Status</span>
        <span className="text-xs text-gray-400">
          Status will automatically update after sending cold email
        </span>
      </div>
      <Button type="button" variant={"lightBlue"}>
        Send Cold Email
      </Button>
    </div>
  );
};

export default ProspectFormLeadStatus;
