import { Button } from "../../tools/buttons/Button";

const ProspectFormSendEmail = () => {
  return (
    <div className="p-8 bg-white flex flex-wrap gap-4 justify-between items-center shadow-md">
      <div className="flex flex-col">
        <span className="font-semibold">Send Email Manually</span>
        <span className="text-xs text-gray-400">
          Select an email template to send an email manually
        </span>
      </div>
      <Button type="button" variant={"lightBlue"}>
        Send Cold Email
      </Button>
    </div>
  );
};

export default ProspectFormSendEmail;
