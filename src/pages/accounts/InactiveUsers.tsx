import React, { useState } from "react";
import SearchInput from "../../components/tools/searchInput/SearchInput";
import { FilterLogo } from "../../components/tools/svg/FilterLogo";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import InactiveUsersCard from "../../components/accounts/inactiveUsers/InactiveUsersCard";

const InactiveUsers: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex mt-4 mb-6">
        <div>
          <span className="flex gap-2">
            <p>Accounts</p> / <p className="text-[#41B2E9]">Inactive User</p>
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <SearchInput
            className={"w-46 bg-gray-200"}
            type="text"
            id="Client Name"
            placeholder=" Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="flex border bg-white py-2 px-4 rounded-md">
            <span className="mt-1 mr-2">{FilterLogo}</span> Filters
          </button>
        </div>
        <div className="flex">
          <p className=" flex text-sm mb-1 ">
            Current Week <ChevronDownIcon className="w-6 h-6" />
          </p>
        </div>
      </div>
      <InactiveUsersCard />
    </>
  );
};

export default InactiveUsers;
