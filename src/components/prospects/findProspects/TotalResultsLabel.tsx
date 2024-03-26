import { useMemo } from "react";
import { useFindProspectsContext } from "./FindProspectsContext";
import Divider from "../../tools/divider/Divider";

const TotalResultsLabel = () => {
  const { prospects, prospectsEmails } = useFindProspectsContext();

  const total = useMemo(() => {
    return {
      business: prospects.length,
      // selected: selectedProspects.length,
      website: prospects.filter((prospect) => prospect?.url)?.length,
      emails: prospectsEmails.reduce((acc, prospect) => {
        return acc + prospect?.emails?.length ?? 0;
      }, 0),
      websitesWithEmail: prospectsEmails.filter(
        (prospect) => prospect?.emails?.length > 0
      ).length,
    };
  }, [prospects, prospectsEmails]);

  return (
    <div className="flex flex-wrap flex-col md:flex-row w-full justify-between">
      <span className="">Total Businesses: {prospects.length}</span>
      {/* <Divider direction="vertical" className="hidden lg:block" />
      <span className="">Selected: {selectedProspects.length}</span> */}
      <Divider direction="vertical" className="hidden lg:block" />
      <span className="">Websites: {total.website}</span>
      <Divider direction="vertical" className="hidden lg:block" />
      <span className="">Websites With Emails: {total.websitesWithEmail}</span>
      <Divider direction="vertical" className="hidden lg:block" />
      <span className="">Emails: {total.emails}</span>
    </div>
  );
};

export default TotalResultsLabel;
