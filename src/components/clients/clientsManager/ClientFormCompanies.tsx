import React, { useState } from "react";
import CompanyLinksTable from "../../orders/_ordersManager/orderInformation/CompanyLinksTable";
import { Button } from "../../tools/buttons/Button";

const ClientFormCompanies: React.FC = () => {
  const [formState, setFormState] = useState({ name: "", url: "" });

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="border-b border-grGray-dark divide-y divide-y-gray-300">
      <div className="flex flex-col gap-4">
        <span className="font-medium block">Add New Company</span>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="newCompanyName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="newCompanyName"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="newCompanyUrl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              URL
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="newCompanyUrl"
                value={formState.url}
                onChange={(e) => handleChange("url", e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <Button type="button" className="self-end mb-8">
          Add Company
        </Button>
      </div>
      <div className="py-8 flex flex-col">
        <span className="font-medium mb-4">Client Links</span>
        <CompanyLinksTable companies={[]} />
      </div>
    </div>
  );
};

export default ClientFormCompanies;
