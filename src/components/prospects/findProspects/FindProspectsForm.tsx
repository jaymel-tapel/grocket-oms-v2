import { CSVLink, CSVDownload } from "react-csv";
import { useFindProspectsContext } from "./FindProspectsContext";
import { Button } from "../../tools/buttons/Button";
import FindProspectsStepper from "./FindProspectsStepper";
import FindProspectsFormStep1 from "./FindProspectsFormStep1";
import FindProspectsFormStep2 from "./FindProspectsFormStep2";
import FindProspectsFormStep3 from "./FindProspectsFormStep3";
import FindProspectsFormStep4 from "./FindProspectsFormStep4";
import FindProspectsFormStep5 from "./FindProspectsFormStep5";

import { useMemo } from "react";
import {
  useScrapeProspectEmails,
  useScrapeProspectWebsite,
} from "../../../services/queries/prospectsQueries";
import { useNavigate } from "@tanstack/react-router";

const FindProspectsForm = () => {
  const { step } = useFindProspectsContext();

  const stepLabel = useMemo(() => {
    switch (step) {
      case 1:
        return "Enter Keywords";
      case 2:
        return "Select Prospects";
      case 3:
        return "Scrape Website Emails";
      case 4:
        return "Save Prospects";
      default:
        return "";
    }
  }, [step]);

  return (
    <div className="bg-white p-12">
      <div className="md:hidden text-grBlue-base">
        Step {step}: {stepLabel}
      </div>
      <div className="hidden md:block">
        <FindProspectsStepper />
      </div>
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
        {step === 5 && (
          <FindProspectsFormStep5>
            <ProspectFormNavigation />
          </FindProspectsFormStep5>
        )}
      </div>
    </div>
  );
};

export default FindProspectsForm;

const csvColumns = [["Business Name", "Rating", "Phone", "Website", "Email"]];

const ProspectFormNavigation = () => {
  const navigate = useNavigate();
  const { step, setStep, prospects, prospectsEmails } =
    useFindProspectsContext();

  const { stopScrapeWebsite } = useScrapeProspectWebsite();
  const { stopScrapeEmails } = useScrapeProspectEmails();

  const finalCsvData = useMemo(() => {
    const mappedData: Array<string[]> = [];

    prospects.forEach((prospect, index) => {
      const emails = prospectsEmails[index]?.emails || [];

      if (emails?.length > 0) {
        // Add a row for each email
        emails.forEach((email) => {
          mappedData.push([
            prospect.name,
            prospect.rating?.toFixed() ?? "",
            prospect.phone,
            prospect.url,
            email,
          ]);
        });
      } else {
        // If there are no emails, add a single row
        mappedData.push([
          prospect.name,
          prospect.rating?.toFixed() ?? "",
          prospect.phone,
          prospect.url,
          "",
        ]);
      }
    });

    return csvColumns.concat(mappedData);
  }, [prospectsEmails, prospects]);

  const handlePrevious = () => {
    if (step === 1) {
      navigate({ to: "/prospects" });
      return;
    } else if (step === 2 || step === 4) {
      stopScrapeWebsite();
    } else if (step === 3 || step === 5) {
      stopScrapeEmails();
    }

    setStep(step - 1);
  };

  return (
    <div className="pt-8 border-t border-t-gray-300 flex max-sm:flex-col gap-4 justify-between">
      <Button type="button" variant="delete" onClick={handlePrevious}>
        {step > 1 ? "Previous" : "Go back"}
      </Button>

      {step === 5 && (
        <CSVDownload
          data={finalCsvData}
          filename={"oms-prospects.csv"}
          target="_blank"
        />
      )}

      <div className="flex gap-4 max-sm:flex-col">
        {step === 5 && (
          <Button
            type="button"
            variant={"lightBlue"}
            // onClick={(e) => e.stopPropagation()}
          >
            <CSVLink data={finalCsvData} filename={"oms-prospects.csv"}>
              Export CSV
            </CSVLink>
          </Button>
        )}
        {/* {step !== 5 && (
          <Button type="submit">
            {step === 4 ? "Skip email scraping?" : "Next"}
          </Button>
        )} */}

        {step === 1 && <Button type="submit">Next</Button>}
      </div>
    </div>
  );
};
