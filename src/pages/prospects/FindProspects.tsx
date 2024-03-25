import FindProspectsProvider from "../../components/prospects/findProspects/FindProspectsContext";
import FindProspectsForm from "../../components/prospects/findProspects/FindProspectsForm";
import LoggedSection from "../../components/sections/LoggedSection";

const FindProspects = () => {
  return (
    <LoggedSection>
      <FindProspectsProvider>
        <FindProspectsForm />
      </FindProspectsProvider>
    </LoggedSection>
  );
};

export default FindProspects;
