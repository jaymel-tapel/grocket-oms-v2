import { useFindProspectsContext } from "./FindProspectsContext";
import { Button } from "../../tools/buttons/Button";
import FindProspectsStepper from "./FindProspectsStepper";
import FindProspectsFormStep1 from "./FindProspectsFormStep1";
import FindProspectsFormStep2 from "./FindProspectsFormStep2";

const FindProspectsForm = () => {
  const { step } = useFindProspectsContext();

  return (
    <div className="bg-white p-12">
      <FindProspectsStepper />
      <div className="mt-12 mb-8 border-t border-t-gray-300" />
      <div>
        {step === 1 && (
          <FindProspectsFormStep1>
            <ProspectFormNavigation />
          </FindProspectsFormStep1>
        )}
        {step === 2 && (
          <FindProspectsFormStep2>
            <ProspectFormNavigation />
          </FindProspectsFormStep2>
        )}
      </div>
    </div>
  );
};

export default FindProspectsForm;

const ProspectFormNavigation = () => {
  const { step, setStep } = useFindProspectsContext();

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="pt-8 border-t border-t-gray-300 flex justify-between">
      <div>
        {step > 1 && (
          <Button type="button" variant="delete" onClick={handlePrevious}>
            Previous
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        <Button type="submit">
          {step === 4
            ? "Save Prospects"
            : step === 3
            ? "Skip email scraping?"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};
