import ProspectForm from "../../components/prospects/prospectForm/ProspectForm";
import ProspectFormLeadStatus from "../../components/prospects/prospectForm/ProspectFormLeadStatus";
import ProspectFormLogs from "../../components/prospects/prospectForm/ProspectFormLogs";
import ProspectFormSendEmail from "../../components/prospects/prospectForm/ProspectFormSendEmail";
import { prospectRoute } from "../routeTree";

const mockProspect = {
  id: 1,
  businessName: "Giovanni's Italian Bistro",
  rating: "4.5",
  reviews: "135",
  phone: "+1234567890",
  mapsUrl: "https://www.google.com/maps/place/Giovanni's+Italian+Bistro",
  website: "https://giovannisbistro.com",
  notes:
    "Great place for authentic Italian dishes. Need to follow up for potential catering service.",
  emails: ["contact@giovannisbistro.com", "test@gmail.com"],
};

const Prospect = () => {
  const { prospectId } = prospectRoute.useParams();
  console.log(prospectId);

  return (
    <>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Prospects / My Prospects</p>
          <p className="text-[#41B2E9]">{mockProspect.businessName}</p>
        </span>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-8">
        <ProspectForm prospect={mockProspect} />
        <div className="w-full flex flex-col gap-8">
          <ProspectFormLeadStatus />
          <ProspectFormSendEmail />
          <ProspectFormLogs />
        </div>
      </div>
    </>
  );
};

export default Prospect;
