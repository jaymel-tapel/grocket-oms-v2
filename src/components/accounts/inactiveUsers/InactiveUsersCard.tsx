import React, { useState } from "react";
import {
  SmallCalendarIcon,
  SmallCheckIcon,
  SmallEnvelopIconBlue,
  SmallEnvelopIconGray,
  SmallPaperAirplane,
  SmallPhoneIcon,
  SmallPhoneIconGray,
  SmallTransIcon,
} from "../../tools/svg/InactiveUsersLogos";

const InactiveUsersCard: React.FC = () => {
  // test
  const [tableData] = useState([
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/18/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/26/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/25/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/25/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/25/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
    {
      id: 1,
      name: "Jane Doe",
      title: "Seller",
      InactiveDate: "11/25/2023",
      CalendarDate: "2023-01-14 4:00:00 PM",
      email: "jdoe@example.com",
      phoneNumber: "0989 989 5845",
    },
  ]);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      {tableData.map((item) => (
        <div className="rounded-sm mt-4 border shadow-lg border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
          <div key={item.id} className="flex justify-between gap-4">
            <div>
              <p className="text-black text-sm mb-1">
                {item.name} <span>({item.title})</span>
              </p>
              <p className="text-sm mb-1 mt-0 font-medium">
                Inactive Since {item.InactiveDate}
              </p>
              <div className="flex flex-1 gap-2 mt-4">
                <button>
                  <span>{SmallCheckIcon}</span>
                </button>
                <button>{SmallTransIcon}</button>
                <span className="border-r-2"></span>
                <button> {SmallEnvelopIconBlue}</button>
                <button>{SmallPhoneIcon}</button>
                <button> {SmallPaperAirplane}</button>
              </div>
            </div>
            <div className="max-w-fit">
              <div className="flex gap-2">
                <button>{SmallCalendarIcon}</button>
                <p className="text-sm text-black font-medium ">
                  {item.CalendarDate}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button> {SmallEnvelopIconGray}</button>
                <p className="text-sm text-black font-medium">{item.email}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button>{SmallPhoneIconGray}</button>
                <p className="text-sm text-black font-medium">
                  {item.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InactiveUsersCard;
