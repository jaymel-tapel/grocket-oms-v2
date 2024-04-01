import dayjs from "dayjs";
import { EmailLogsResponse } from "../../../services/queries/prospectsQueries";
import StatusProgress from "./StatusProgress";
// import { useMemo } from "react";

type Template = {
  id: number;
  name: string;
};

type Props = {
  templates: Template[];
  logs: EmailLogsResponse;
};

const ProspectFormLogs: React.FC<Props> = ({ logs }) => {
  // const statusLogs = useMemo(() => {
  //   console.log(templates);
  // }, [templates])

  return (
    <div className="flex flex-1 gap-8 max-md:flex-col">
      <div className="p-8 bg-white flex flex-1 gap-4 shadow-md">
        <div className="flex flex-col gap-6">
          <span className="font-semibold">Status Logs</span>
          <StatusProgress />
        </div>
      </div>

      <div className="p-8 bg-white flex flex-1 gap-4 shadow-md">
        <div className="flex flex-col">
          <span className="font-semibold">Email Logs</span>
          <div className="mt-6 flex flex-col gap-4">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-1 bg-grBlue-dark" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium uppercase">
                    {log.template}
                  </span>
                  <span className="text-sm text-gray-500">
                    {dayjs(log.createdAt).format("MMMM DD, YYYY h:mm A")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectFormLogs;
