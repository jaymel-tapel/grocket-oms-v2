import { useState } from "react";
import TextInput from "../../tools/inputForms/TextInput";
import {
  ChainLinkIcon,
  SmallTrashIcon,
} from "../../tools/svg/DashboardTasksLogos";

const AddClients: React.FC = () => {
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [partyId, setPartyId] = useState("");
  const [clientOrigin, setClientOrigin] = useState("");
  const [industry, setIndustry] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [unitCost, setUnitCost] = useState("");

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
      <div className="pb-4 text-black">Add Client</div>
      <div className="bg-white first-letter:rounded-sm border h-auto w-full shadow-lg ">
        <form>
          <ul className="w-[95%]">
            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Client Information</p>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="text"
                  id="client name"
                  label="Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"w-96 bg-gray-200"}
                  type="email"
                  id="email"
                  label="Client Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </li>

            <li className="ml-8 w-96 mt-4 sm:col-span-4 ">
              <TextInput
                inputClassName={" bg-gray-200"}
                type="text"
                id="phone"
                label="Client Phone"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </li>

            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Status</p>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"w-96 bg-gray-200"}
                  type="text"
                  id="seller name"
                  label="3rd Party ID"
                  value={partyId}
                  onChange={(e) => setPartyId(e.target.value)}
                />
              </div>
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"w-96 bg-gray-200"}
                  type="email"
                  id="email"
                  label="Client Origin"
                  value={clientOrigin}
                  onChange={(e) => setClientOrigin(e.target.value)}
                />
              </div>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="text"
                  id="phone"
                  label="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"w-96 bg-gray-200"}
                  type="password"
                  id="client password"
                  label="Assigned Client Password"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                />
              </div>
            </li>

            <li className="flex justify-between">
              <div className="ml-8 w-1/6 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="text"
                  id="phone"
                  label="Unit Cost"
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                />
              </div>
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="password"
                  id="client password"
                  label="Assigned Client Password"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                />
              </div>
            </li>

            <li className="w-full mt-4 ml-8">
              <div className=" mt-2 flex justify-center w-full">
                <table className="w-full">
                  <thead className="">
                    <tr className="flex items-start">
                      {headers.map((header, i) => (
                        <th key={i} className="py-3 px-2 border-b w-1/4">
                          {header}
                        </th>
                      ))}
                      <th className="border-b py-3 px-2  w-[8.2rem]">
                        "ACTION"
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.map((data, i) => (
                      <tr key={i} className="flex items-start">
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

            <div className="flex justify-end  mb-4 gap-2 mt-4">
              <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                Cancel
              </button>

              <button className="border rounded-md bg-[#3C50E0] text-white  h-10 px-8">
                Submit
              </button>
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default AddClients;
