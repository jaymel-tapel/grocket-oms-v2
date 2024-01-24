import { CSVLink } from "react-csv";
import { useFindProspectsContext } from "./FindProspectsContext";
import { Button } from "../../tools/buttons/Button";
import FindProspectsStepper from "./FindProspectsStepper";
import FindProspectsFormStep1 from "./FindProspectsFormStep1";
import FindProspectsFormStep2 from "./FindProspectsFormStep2";
import FindProspectsFormStep3 from "./FindProspectsFormStep3";
import FindProspectsFormStep4 from "./FindProspectsFormStep4";
import { useMemo } from "react";

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
        {step === 3 && (
          <FindProspectsFormStep3>
            <ProspectFormNavigation />
          </FindProspectsFormStep3>
        )}
        {step === 4 && (
          <FindProspectsFormStep4>
            <ProspectFormNavigation />
          </FindProspectsFormStep4>
        )}
      </div>
    </div>
  );
};

export default FindProspectsForm;

const csvColumns = [
  ["Business Name", "Rating", "Phone", "Website", "Email(s)"],
];

const ProspectFormNavigation = () => {
  const { step, setStep, selectedProspects, prospectsEmails } =
    useFindProspectsContext();

  const finalCsvData = useMemo(() => {
    const mappedData = selectedProspects.map((prospect, index) => [
      prospect.businessName,
      prospect.rating,
      prospect.phone,
      prospect.website,
      prospectsEmails[index]?.emails?.join(", "),
    ]);

    return csvColumns.concat(mappedData);
  }, [prospectsEmails, selectedProspects]);

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
        {step === 4 && (
          <Button type="button" variant={"lightBlue"}>
            <CSVLink data={finalCsvData} filename={"oms-prospects.csv"} />
            Export CSV
          </Button>
        )}
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
