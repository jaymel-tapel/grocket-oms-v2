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
  const { scrapeProspects, stopScrapeProspects } = useScrapeProspects();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopScrapeProspects();
    setStep(3);
  };

  const scrapeProgress = useMemo(() => {
    const selectedCities = cities.filter((item) => item.checked);

    const done = selectedCities.filter(
      (item) => item.status === "success" || item.status === "error"
    ).length;

    const pendingCities = selectedCities
      .filter((item) => item.status === "pending")
      .map((item) => item.name);
    const pending = pendingCities.join(", ");

    const percent = (done / selectedCities.length) * 100;

    const status = `${done} out of ${selectedCities.length} cities`;

    const errorCities = selectedCities.filter(
      (city) => city.status === "error"
    );

    const errors =
      errorCities.length > 0
        ? errorCities.map((city) => city.name).join(", ")
        : "None";

    return { percent, status, errors, pending };
  }, [cities]);

  useEffect(() => {
    const fetchData = async () => {
      // Wait for 200 milliseconds
      await new Promise((resolve) => setTimeout(resolve, 200));
      scrapeProspects();
    };

    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 text-sm grid grid-cols-3">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="font-bold">Country:</span>
            <span>{prospectFinder.country}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Total Estimated Time:</span>
            <span>{estimates.total_estimated_time}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Scraped Cities:</span>
            <span>{scrapeProgress.status}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Scraped Prospects:</span>
            <span>{prospects.length}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Errors:</span>
            <span>{scrapeProgress.errors}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative flex justify-center">
            <div className="absolute w-[25%] text-center z-10 flex flex-col gap-2 items-center h-full justify-center">
              <span>Searching</span>
              {scrapeProgress.pending && (
                <span className="font-bold">{`${scrapeProgress.pending}`}</span>
              )}
            </div>

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
