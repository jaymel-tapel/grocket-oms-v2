import { useMemo } from "react";
import ProspectForm from "../../components/prospects/prospectForm/ProspectForm";
import ProspectFormLeadStatus from "../../components/prospects/prospectForm/ProspectFormLeadStatus";
import ProspectFormLogs from "../../components/prospects/prospectForm/ProspectFormLogs";
import ProspectFormSendEmail from "../../components/prospects/prospectForm/ProspectFormSendEmail";
import {
  useGetMyProspects,
  useGetProspectDetails,
} from "../../services/queries/prospectsQueries";
import { prospectRoute } from "../routeTree";

const Prospect = () => {
  const { prospectId } = prospectRoute.useParams();
  const { data: prospect } = useGetProspectDetails(prospectId);
  const { data: prospects } = useGetMyProspects();

  const templates = useMemo(() => {
    if (!prospects) return [];

    const templates = prospects.map((template) => {
      return { id: template.id, name: template.name };
    });

    return templates;
  }, [prospects]);

  const initialTemplate = useMemo(() => {
    if (!prospect || !prospects) {
      return { id: 1, name: "" };
    }

    const template = prospects.find(
      (template) => template.id === prospect.templateId
    );

    if (!template) {
      return { id: 1, name: "" };
    } else {
      return { id: template.id, name: template.name };
    }
  }, [prospect, prospects]);

  return (
    <>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Prospects / My Prospects / </p>
          <p className="text-[#41B2E9]">{prospect?.name}</p>
        </span>
      </div>
      {prospect && (
        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          <ProspectForm prospect={prospect} />
          <div className="w-full flex flex-col gap-8">
            <ProspectFormLeadStatus
              initialTemplate={initialTemplate}
              templates={templates}
              prospectId={prospectId}
            />
            <ProspectFormSendEmail />
            <ProspectFormLogs />
          </div>
        </div>
      )}
    </>
  );
};

export default Prospect;
