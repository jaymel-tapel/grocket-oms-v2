import FindProspectsProvider from "../../components/prospects/findProspects/FindProspectsContext";
import FindProspectsForm from "../../components/prospects/findProspects/FindProspectsForm";

const FindProspects = () => {
  return (
    <div>
      <FindProspectsProvider>
        <FindProspectsForm />
      </FindProspectsProvider>
    </div>
  );
};

export default FindProspects;
