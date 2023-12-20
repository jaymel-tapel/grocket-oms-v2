import { GreenSign, RedSign } from "../../tools/svg/GreenSign";

const data = [
  {
    id: 1,
    title: "New Orders",
    amount: "104",
    status: <GreenSign />,
    sData: "Since last week",
  },
  {
    id: 2,
    title: "New Clients",
    amount: "89",
    status: <RedSign />,
    sData: "Since last week",
  },
  {
    id: 3,
    title: "Paid Invoice",
    amount: "$ 9,999",
    status: <GreenSign />,
    sData: "Since last week",
  },
];

const DashboardBoxData: React.FC = () => {
  return (
    <div className="mb-8 ">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default shadow"
          >
            <div className=" ml-7 items-end">
              <div className="mb-2">
                <h4 className="text-2xl font-bold text-black mb-4">
                  {item.amount}
                </h4>
                <span className="text-base font-medium">{item.title}</span>
              </div>

              <span className="flex gap-2  font-medium text-sm">
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

export default DashboardBoxData;
