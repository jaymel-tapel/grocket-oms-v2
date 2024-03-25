import { useNavigate } from "@tanstack/react-router";
import EmailTemplateCard from "../../../components/prospects/EmailTemplateCard";
import { Button } from "../../../components/tools/buttons/Button";
import { useGetEmailTemplates } from "../../../services/queries/prospectsQueries";

const Index = () => {
  const navigate = useNavigate();

  const { data: templates } = useGetEmailTemplates();

  const handleNewTemplate = () => {
    navigate({ to: "/prospect-email-templates/new" });
  };

  return (
    <>
      <div className="flex mt-4 max-md:items-center justify-between mb-8">
        <div>
          <span className="flex gap-2">
            <p className="hidden md:block">Prospects / </p>
            <p className="text-[#41B2E9] text-xl md:text-base">
              Email Templates
            </p>
          </span>
        </div>
        <Button type="button" variant="lightBlue" onClick={handleNewTemplate}>
          New Template
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {templates?.map((template, index) => (
          <EmailTemplateCard template={template} key={index} />
        ))}
      </div>
    </>
  );
};

export default Index;
