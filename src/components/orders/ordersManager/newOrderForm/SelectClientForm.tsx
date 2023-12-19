import { useState } from "react";
import TextInput from "../../../tools/inputForms/TextInput";
import { ArrowRight } from "../../../tools/svg/ArrorRight";

const SelectClientForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [sellersName, setSellersName] = useState("");
  const [partyId, setPartyId] = useState("");
  const [clientOrigin, setClientOrigin] = useState("");
  const [industry, setIndustry] = useState("");
  const [unitCost, setUnitCost] = useState("");
  return (
    <>
      <div className="pb-4 text-black">Add Order</div>
      <div className="rounded-sm border bg-white h-auto w-full shadow-lg ">
        <form>
          <ul className="w-[95%]">
            <li className="flex ml-4 mr-4 mt-10 border-b sm:col-span-4 ">
              <p className=" ml-4">Select Seller </p>
              {ArrowRight}
              <p className="text-black ml-2">Select Seller </p>
              {ArrowRight}
              <p className="ml-2">Select Client Link </p>
              {ArrowRight}
              <p className="ml-2">Add Reviews </p>
            </li>

            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Seller and Client Information</p>
            </li>

            <li className="flex gap-8">
              <div className="ml-8 w-1/2 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="text"
                  id="seller name"
                  label="Seller Name"
                  value={sellersName}
                  onChange={(e) => setSellersName(e.target.value)}
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

            <li className="ml-8 w-96 mt-4 sm:col-span-4 ">
              <TextInput
                inputClassName={"bg-gray-200"}
                type="text"
                id="phone"
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </li>

            <li className="ml-8 w-48 mt-4 sm:col-span-4 ">
              <TextInput
                inputClassName={" bg-gray-200"}
                type="text"
                id="phone"
                label="Unit Cost"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
              />
            </li>

            <div className="flex justify-end  mb-4 gap-2 mt-4">
              <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                Cancel
              </button>
              <button className="border rounded-md bg-[#10B981] text-white  h-10 px-8">
                Previous
              </button>
              <button className="border rounded-md bg-[#3C50E0] text-white  h-10 px-8">
                Next
              </button>
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SelectClientForm;
