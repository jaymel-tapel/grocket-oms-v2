import { GreenSign, RedSign } from "../../tools/svg/GreenSign";

const data = [
  {
    id: 1,
    title: "Total Orders",
    amount: 6,
    status: <GreenSign />,
    sData: "Since last week",
  },
  {
    id: 2,
    title: "Paid Orders",
    amount: 0,
    status: <GreenSign />,
    sData: "Since last week",
  },
  {
    id: 3,
    title: "Average Amount Reviews",
    amount: "1.25",
    status: <RedSign />,
    sData: "Since last week",
  },
  {
    id: 4,
    title: "Average Unit Cost",
    amount: "27.5",
    status: <GreenSign />,
    sData: "Since last week",
  },
];

const OrdersDataBox: React.FC = () => {
  return (
    <div className="mb-10 ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <div className="mt-4 ml-2 items-end">
              <div>
                <h4 className="text-title-md font-bold text-black ">
                  {item.amount}
                </h4>
                <span className="text-sm font-medium">{item.title}</span>
              </div>

              <span className="flex gap-1 font-medium text-sm">
                {item.status}
                {item.sData}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDataBox;
