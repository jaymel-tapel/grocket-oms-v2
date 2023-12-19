import { useState } from "react";
import TextInput from "../../../tools/inputForms/TextInput";
import { ArrowRight } from "../../../tools/svg/ArrorRight";
import {
  ChainLinkIcon,
  SmallTrashIcon,
} from "../../../tools/svg/DashboardTasksLogos";

const SelectAddReviews: React.FC = () => {
  const [reviews, setReviews] = useState("");
  const [remarks, setRemarks] = useState("");
  const [totalAdded, setTotalAdded] = useState("");
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
      <div className="rounded-sm border bg-white h-auto w-full shadow-lg ">
        <form>
          <ul className="w-full">
            <li className="flex ml-4 mr-4 mt-10 border-b  ">
              <p className=" ml-4">Select Seller </p>
              {ArrowRight}
              <p className="ml-2">Select Seller </p>
              {ArrowRight}
              <p className=" ml-2">Select Client Link </p>
              {ArrowRight}
              <p className="text-black ml-2">Add Reviews </p>
            </li>

            <li className="w-full mt-4 ml-8">
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

            <li className="w-full mt-4 ml-8 ">
              <div className="border w-11/12 py-1 px-1 gap-2">
                <button className="border mr-2 rounded-md bg-[#3C50E0] text-white h-10 px-8">
                  Select From Reviews
                </button>
                <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                  Manually Add Review
                </button>
              </div>
            </li>

            <li className="w-full mt-4 ml-8">
              <div className="flex w-1/2 gap-2 ">
                <TextInput
                  inputClassName={"w-96 bg-gray-200"}
                  type="number"
                  id="review"
                  label="No. Of Reviews"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                />
                <button className="border mt-6 rounded-md bg-[#333A48] hover:bg-slate-500 text-white px-8 h-10">
                  Gew Review
                </button>
              </div>
            </li>

            <li className="w-full mt-4 ml-8">
              <p className="text-black  w-60  border-b sm:col-span-4 ">
                Results
              </p>
              <div className=" mt-2 flex justify-center w-full">
                <table className="w-full">
                  <thead className="">
                    <tr className="flex items-start">
                      {headers.map((header, index) => (
                        <th key={index} className="py-3 px-2 border-b w-1/4">
                          {header}
                        </th>
                      ))}
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

            <li className="flex gap-8">
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="text"
                  id="Client Name"
                  label="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <div className="flex gap-2  h-6 items-center">
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#13C296] focus:ring-[#13C296]"
                  />
                  <label className="text-black text-sm">
                    Send Order Confirmation Detail
                  </label>
                </div>
              </div>
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="email"
                  id="email"
                  label="Total Added"
                  value={totalAdded}
                  onChange={(e) => setTotalAdded(e.target.value)}
                />{" "}
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

export default SelectAddReviews;
