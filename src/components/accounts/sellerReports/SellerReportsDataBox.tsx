import { GreenSign, RedSign } from "../../tools/svg/GreenSign";

const data = [
  {
    id: 1,
    title: "Total Seller Accounts",
    amount: "114",
    status: <GreenSign />,
    sData: "Since last week",
  },
  {
    id: 2,
    title: "Active Seller Accounts",
    amount: "89",
    status: <RedSign />,
    sData: "Since last week",
  },
  {
    id: 3,
    title: "Inactive Seller Accounts",
    amount: "25",
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

export default DashboardBoxData;
