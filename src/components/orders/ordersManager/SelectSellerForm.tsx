import { useState } from "react";
import TextInput from "../../../tools/inputForms/TextInput";
import { ArrowRight } from "../../../tools/svg/ArrorRight";

const SelectSellerForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [sellersName, setSellersName] = useState("");

  const handleNext = () => {
    // navigate("/orders/new/select_client");
  };

  return (
    <>
      <div className="pb-4 text-black">Add Order</div>
      <div className="rounded-sm bg-white border w-full h-[25rem] shadow-lg ">
        <form>
          <ul>
            <li className="flex ml-4 mr-4 mt-10 border-b sm:col-span-4 ">
              <p className="text-black ml-4">Select Seller </p>
              {ArrowRight}
              <p className="ml-2">Select Client </p>
              {ArrowRight}
              <p className="ml-2">Select Client Link </p>
              {ArrowRight}
              <p className="ml-2">Add Reviews </p>
            </li>

            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Sellers Information</p>
            </li>

            <li className="ml-8 w-5/12 mt-4 sm:col-span-4 ">
              <TextInput
                inputClassName={"bg-gray-200"}
                type="date"
                id="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </li>
            <li className="flex w-full gap-8">
              <div className="ml-8 w-96 mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="text"
                  id="sellers name"
                  label="Sellers Name"
                  value={sellersName}
                  onChange={(e) => setSellersName(e.target.value)}
                />
              </div>
              <div className="ml-8 w-96  mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="email"
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </li>

            <div className="flex justify-end mr-[3.2rem] gap-2 mt-4">
              <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                Cancel
              </button>
              <button
                className="border rounded-md bg-[#3C50E0] text-white px-4 h-10  "
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SelectSellerForm;
