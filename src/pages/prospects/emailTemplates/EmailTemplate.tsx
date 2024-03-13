import { editProspectEmailTemplateRoute } from "../../routeTree";
import EmailTemplateForm from "../../../components/prospects/EmailTemplateForm";
import { useGetEmailTemplate } from "../../../services/queries/prospectsQueries";

const EmailTemplate = () => {
  const { templateId } = editProspectEmailTemplateRoute.useParams();

  const { data } = useGetEmailTemplate(templateId);

  return (
    <>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Prospects / Email Templates / </p>
          <p className="text-[#41B2E9]">
            {templateId ? templateId : "New Template"}
          </p>
        </span>
      </div>
      <div className="mt-8">
        <EmailTemplateForm template={templateId && data ? data : undefined} />
      </div>
    </>
  );
};

export default EmailTemplate;
