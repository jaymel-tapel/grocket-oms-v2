import dayjs from "dayjs";
import { OrderLog } from "../../../../services/queries/orderQueries";

type Props = {
  logs: OrderLog[];
};
const OrderLogs = ({ logs }: Props) => {
  return (
    <div className="bg-grGray-base my-8 p-8">
      {logs.map((log) => (
        <div className="flex flex-col gap-4" key={log.id}>
          <p>
            <span className="font-mono">
              {dayjs(log.updatedAt).format("YYYY-MM-DD HH:mm:ss")} -{" "}
            </span>
            <span className="capitalize font-mono">{log.action} by </span>
            <span className="font-mono">{log.by}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderLogs;
