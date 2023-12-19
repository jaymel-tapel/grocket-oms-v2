import { useState } from "react";
import Table from "../../tools/table/Table";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import TableContainer from "../../tools/table/TableContainer";
import TableHead from "../../tools/table/TableHead";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableRow from "../../tools/table/TableRow";
import SearchInput from "../../tools/searchInput/SearchInput";
import { FilterLogo, SliderIcon } from "../../tools/svg/FilterLogo";
import NormalCheckBox from "../../tools/checkbox/NormalCheckBox";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SmallMagnifyingIcon } from "../../tools/svg/DashboardInboxLogos";

interface NormalCheckBoxProps {
  id?: string;
}

const ClientsManagersTable: React.FC<NormalCheckBoxProps> = () => {
  const [search, setSearch] = useState("");
  const DataHead: React.ReactNode[] = [
    <NormalCheckBox id="table" key="checkbox" />,
    "ID",
    "EMAIL",
    "NAME",
    "ORDERS",
    "TOTAL AMOUNT",
    "DATE REGISTERED",
  ];

  const [tabledata] = useState([
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
    {
      ID: "1021",
      EMAIL: "Example@example.com",
      NAME: "Jaymel Tapel",
      ORDERS: "1",
      TOTAL_AMOUNT: "$149",
      DATE_REGISTERED: "2023-01-14 2:04:59 PM",
    },
  ]);
  return (
    <>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Clients</p> / <p className="text-[#41B2E9]">Client Report</p>
          </span>
        </div>
        <button
          type="button"
          className="rounded-md bg-[#41B2E9] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Client
        </button>
      </div>
      <div className="bg-white">
        <TableContainer>
          <div className="flex justify-between mt-6 ml-6">
            <div>
              <SearchInput
                className={"w-46 bg-gray-200"}
                type="text"
                id="Client Name"
                placeholder=" Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-2 mt-2 ml-2">
                <NormalCheckBox id="checking" label="Transfer Clients" />
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="flex flex-colhidden lg:flex lg:items-center">
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>

                  <Menu.Items className="absolute flex gap-2 left-[-10rem]  z-10 mt-2.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <div className="ml-2 mr-8">
                      <span className="absolute mt-1">
                        {SmallMagnifyingIcon}
                      </span>
                      <input
                        className="ml-6 w-auto text-sm font-medium color-[#64748B]"
                        placeholder="Search for seller, email address..."
                      />
                    </div>
                    {SliderIcon}

                    <button className="flex border font-medium text-sm px-1 text-white rounded-md bg-[#3C50E0] hover:bg-blue-400 h-auto w-24">
                      Transfer
                      <span className="mt-1 ml-1">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.46967 0.46967C6.76256 0.176777 7.23744 0.176777 7.53033 0.46967L13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L7.53033 13.5303C7.23744 13.8232 6.76256 13.8232 6.46967 13.5303C6.17678 13.2374 6.17678 12.7626 6.46967 12.4697L11.1893 7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H11.1893L6.46967 1.53033C6.17678 1.23744 6.17678 0.762563 6.46967 0.46967Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </button>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <div className="mr-[11rem]">
              <button className="flex border py-2 px-4 rounded-md hover:bg-slate-50">
                <span className="mt-1 mr-2">{FilterLogo}</span> Filters
              </button>
            </div>
            <div className="mr-8 gap-4">
              <input
                className="border mr-2 py-2 px-2 rounded-md"
                type="date"
                placeholder="Date Start"
              />
              <input
                className="border py-2 px-2 rounded-md"
                type="date"
                placeholder="End Date"
              />
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                {DataHead.map((head, i) => (
                  <TableHeadCell key={i}>{head}</TableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tabledata.map((item, i) => (
                <TableRow key={i}>
                  <TableBodyCell>
                    <NormalCheckBox id="checkingData" />
                  </TableBodyCell>
                  <TableBodyCell>{item.ID}</TableBodyCell>
                  <TableBodyCell>{item.EMAIL}</TableBodyCell>
                  <TableBodyCell>{item.NAME}</TableBodyCell>
                  <TableBodyCell>{item.ORDERS}</TableBodyCell>
                  <TableBodyCell>{item.TOTAL_AMOUNT}</TableBodyCell>
                  <TableBodyCell>{item.DATE_REGISTERED}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ClientsManagersTable;
