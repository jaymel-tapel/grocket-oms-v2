import { ArrowRight } from "../../../tools/svg/ArrorRight";
import DropdownText from "../../../tools/dropdowntext/DropdownText";
import {
  FiveStar,
  FourStar,
  OneStar,
  ThreeStar,
  TwoStar,
} from "../../../tools/svg/StarRatings";
import { useState } from "react";
import TextInput from "../../../tools/inputForms/TextInput";
import {
  ChainLinkIcon,
  SmallTrashIcon,
} from "../../../tools/svg/DashboardTasksLogos";

const SelectClientLinkForm: React.FC = () => {
  const [clientName, setClientName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");

  const headers = ["ID", "LINK NAME", "URL"];
  const rowData = [
    {
      ID: 1,
      LINK_NAME: "Company",
      URL: "http://example.com",
    },
    {
      ID: 2,
      LINK_NAME: "New Company",
      URL: "http://example.com",
    },
  ];

  return (
    <>
      <div className="pb-4 text-black">Add Order</div>
      <div className="rounded-sm bg-white border h-auto w-full shadow-lg ">
        <form>
          <ul className="w-full">
            <li className="flex ml-4 mr-4 mt-10 border-b  ">
              <p className=" ml-4">Select Seller </p>
              {ArrowRight}
              <p className="ml-2">Select Seller </p>
              {ArrowRight}
              <p className="text-black ml-2">Select Client Link </p>
              {ArrowRight}
              <p className="ml-2">Add Reviews </p>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <DropdownText label="Company" className="text-black" />
              </div>
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <DropdownText label="Company URL" className="text-black" />
              </div>
            </li>

            <li className="flex mt-4 ml-8">
              <div className="">
                <p className="text-black font-medium">Company</p>
                <p className="text-sm mt-2">
                  1785 NE 44th Renton, WA, 98505, United States
                </p>
                <p className="mt-2 text-black font-medium">
                  Current Rating: <span className="ml-2 text-black"> 4.1</span>
                </p>
                <p className="mt-2 text-black font-medium">
                  No. Of Reviews: <span className="ml-1 text-black"> 426</span>
                </p>
              </div>
              <div className="ml-32 mt-1">
                <span className="flex gap-2 text-black">
                  {FiveStar} 5 Stars: <span className="ml-4">217</span>
                </span>
                <span className="flex gap-2 text-black">
                  {FourStar} 4 Stars: <span className="ml-4">113</span>
                </span>
                <span className="flex gap-2 text-black">
                  {ThreeStar} 3 Stars: <span className="ml-4">45</span>
                </span>
                <span className="flex gap-2 text-black">
                  {TwoStar} 2 Stars: <span className="ml-4">16</span>
                </span>
                <span className="flex gap-2 text-black">
                  {OneStar} 1 Star: <span className="ml-7">35</span>
                </span>
              </div>
            </li>

            <li className="w-full mt-4 ml-8">
              <p className=" border-b text-black max-w-[91%]">Client Links</p>
              <div className=" mt-2 flex justify-center w-full">
                <table className="w-full">
                  <thead className="">
                    <tr className="flex items-start">
                      {headers.map((header, index) => (
                        <th key={index} className="py-3 px-2 border-b w-1/4">
                          {header}
                        </th>
                      ))}
                      <th className="py-3 px-2 border-b w-36">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.map((data, index) => (
                      <tr key={index} className="flex items-start">
                        <td className="py-3 px-2 border-b w-1/2">{data.ID}</td>
                        <td className="py-3 px-2 border-b w-1/2">
                          {data.LINK_NAME}
                        </td>
                        <td className="py-3 px-2 border-b w-1/2">{data.URL}</td>
                        <td className="py-3 px-2 border-b  w-1/4 mr-[87px]">
                          <button className="mr-4">{ChainLinkIcon}</button>
                          <button className="ml-4">{SmallTrashIcon}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>

            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Add Client</p>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="text"
                  id="Client Name"
                  label="Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="email"
                  id="email"
                  label="Company URL"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                />
              </div>
            </li>

            <li className="flex ml-auto justify-end mr-[3.2rem] mb-4 gap-2 mt-4">
              <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                Cancel
              </button>
              <button className="border rounded-md bg-[#10B981] text-white  h-10 px-8">
                Previous
              </button>
              <button className="border rounded-md bg-[#3C50E0] text-white h-10 px-8">
                Next
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SelectClientLinkForm;
