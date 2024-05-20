import {
  useGetClientIndustries,
  useGetClientOrigins,
} from "../../../services/queries/clientsQueries";

function ClientFormInformation(props) {
  const { data: industries } = useGetClientIndustries();
  const { data: origins } = useGetClientOrigins();

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-b-gray-300">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Client Information</span>
          <span className="text-xs text-gray-400">
            Remember to provide accurate and up-to-date information
          </span>
        </div>

        <div className="mb-8 grid sm:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="clientName"
                {...props.register("name")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.name && "border-red-500"
                  }`}
              />
              {props.errors.name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.name?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="clientEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="w-full mt-2">
              <input
                type="email"
                id="clientEmail"
                {...props.register("email")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.email && "border-red-500"
                  }`}
              />
              {props.errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="clientPhone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="clientPhone"
                {...props.register("phone")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.phone && "border-red-500"
                  }`}
              />
              {props.errors.phone && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.phone?.message}
                </p>
              )}
            </div>
          </div>
          {props.activeTab === "Client Information" && props.user?.role !== "SELLER" && (
            <div>
              <label
                htmlFor="sellerEmail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Seller Email
              </label>
              <div className="w-full mt-2">
                <input
                  type="text"
                  id="sellerEmail"
                  value={props.sellerEmail}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 `}
                />
              </div>
            </div>)}
          <div />
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Status</span>
          <span className="text-xs text-gray-400">
            Please provide additional information that may be relevant or
            required based on the context
          </span>
        </div>

        <div className="mt-8 mb-4 grid sm:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <label
              htmlFor="thirdPartyId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              3rd Party Id
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="thirdPartyId"
                {...props.register("thirdPartyId")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.thirdPartyId && "border-red-500"
                  }`}
              />
              {props.errors.thirdPartyId && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.thirdPartyId?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="sourceId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Client Origin
            </label>
            <div className="mt-2">
              <select
                id="sourceId"
                autoComplete="off"
                {...props.register("sourceId")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.sourceId && "border-red-500"
                  }`}
              >
                <option disabled>Select Origin</option>
                {origins?.map((origin, index) => {
                  return (
                    <option value={`${origin.id}`} key={index}>
                      {origin.name}
                    </option>
                  );
                })}
              </select>
              {props.errors.sourceId && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.sourceId?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="industryId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Industry
            </label>
            <div className="mt-2">
              <select
                id="industryId"
                autoComplete="off"
                {...props.register("industryId")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.industryId && "border-red-500"
                  }`}
              >
                <option disabled>Select Industry</option>
                {industries?.map((industry, index) => {
                  return (
                    <option value={`${industry.id}`} key={index}>
                      {industry.name}
                    </option>
                  );
                })}
              </select>
              {props.errors.industryId && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.industryId?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="default_unit_cost"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Unit Cost
            </label>
            <div className="w-full mt-2">
              <input
                type="number"
                id="default_unit_cost"
                {...props.register("default_unit_cost")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${props.errors.default_unit_cost && "border-red-500"
                  }`}
              />
              {props.errors.default_unit_cost && (
                <p className="text-xs italic text-red-500 mt-2">
                  {props.errors.default_unit_cost?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientFormInformation;
