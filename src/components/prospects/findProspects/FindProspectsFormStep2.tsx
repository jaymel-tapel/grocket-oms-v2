import React, { ReactNode, useEffect, useMemo } from "react";
import { useScrapeProspects } from "../../../services/queries/prospectsQueries";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, cities, prospects, estimates, prospectFinder } =
    useFindProspectsContext() as FindProspectsContext;
  const { currentCity, scrapeProspects, stopScrapeProspects } =
    useScrapeProspects();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopScrapeProspects();
    setStep(3);
  };

  const scrapeProgress = useMemo(() => {
    const done = cities.filter(
      (item) => item.status === "success" || item.status === "error"
    ).length;

    const percent = (done / cities.length) * 100;

    const status = `${done} out of ${cities.length} cities`;

    return { percent, status };
  }, [cities]);

  useEffect(() => {
    scrapeProspects();
    //eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 text-sm grid grid-cols-3">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="font-bold">Estimated Time:</span>
            <span>{estimates.estimated_search}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Scraped Cities:</span>
            <span>{scrapeProgress.status}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Scraped Prospects:</span>
            <span>{prospects.length}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative flex justify-center">
            {currentCity && (
              <div className="absolute w-[25%] text-center text-lg z-10 flex flex-col items-center h-full justify-center">
                <span>Searching</span>
                <span className="font-bold">{`${currentCity}, ${prospectFinder.country}`}</span>
              </div>
            )}

            <div className="w-[350px]">
              <svg className=" -rotate-90 transform" viewBox="0 0 70 70">
                <circle
                  className="text-grGray-base"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="35"
                  cy="35"
                />
                <circle
                  className="text-grBlue-base"
                  strokeWidth="10"
                  strokeDasharray={30 * 2 * Math.PI}
                  strokeDashoffset={
                    30 * 2 * Math.PI -
                    (scrapeProgress.percent / 100) * 30 * 2 * Math.PI
                  }
                  // strokeLinecap=""
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="35"
                  cy="35"
                />
              </svg>
            </div>
          </div>
        </div>

        <div />
      </div>
      {children}
    </form>
  );
};

export default FindProspectsFormStep2;
