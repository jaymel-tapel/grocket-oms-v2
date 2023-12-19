import { useState } from "react";
import TextInput from "../../../tools/inputForms/TextInput";

const CreateAccount: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sellersName, setSellersName] = useState("");

  return (
    <>
      <div className="pb-4 text-black">Create Account</div>
      <div className="rounded-sm bg-white w-full border h-auto shadow-lg ">
        <form>
          <ul className="w-full">
            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Personal Details</p>
            </li>

            <li className="flex w-11/12  ml-8 gap-10 mt-4 ">
              <div className="  w-full mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="text"
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="   w-full  mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="email"
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </li>
            <li className="flex w-11/12 ml-8 gap-10 mt-4 ">
              <div className="w-full mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className=" w-full mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={" bg-gray-200"}
                  type="email"
                  id="email"
                  label="Contant URL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </li>

            <li className="ml-8 mt-10 w-60  border-b sm:col-span-4 ">
              <p className="text-black">Others</p>
            </li>

            <li className="ml-8 flex w-11/12 gap-8 mt-8">
              <div className="w-full  mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="text"
                  id="sellers name"
                  label="Create Password"
                  value={sellersName}
                  onChange={(e) => setSellersName(e.target.value)}
                />
              </div>
              <div className="w-full  mt-4 sm:col-span-4 ">
                <TextInput
                  inputClassName={"bg-gray-200"}
                  type="text"
                  id="sellers name"
                  label="Role"
                  value={sellersName}
                  onChange={(e) => setSellersName(e.target.value)}
                />
              </div>
            </li>

            <div className="flex justify-end mr-10 mb-10 gap-2 mt-4">
              <button className="border rounded-md bg-[#E2E8F0] hover:bg-white text-black px-8 h-10">
                Cancel
              </button>
              <button className="border rounded-md bg-[#3C50E0] text-white px-4 h-10  ">
                Submit
              </button>
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
