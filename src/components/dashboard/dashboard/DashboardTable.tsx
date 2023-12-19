const columnNames = ["Name", "Email", "Industry", "Orders", "Amount", "Date"];

const people = [
  {
    name: "Lindsay Walton",
    email: "Front-end Developer",
    industry: "lindsay.walton@example.com",
    orders: "Member",
    amount: "$90",
    date: "12/30/2022",
  },
  {
    name: "Andrew White",
    email: "Sr. Front-end Developer",
    industry: "Andrew.White@example.com",
    orders: "Member",
    amount: "$80",
    date: "12/18/2022",
  },
];

const DashboardTable: React.FC = () => {
  return (
    <div className="border bg-white focus:outline-none shadow-md ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base mt-6 font-semibold leading-6 text-gray-900">
              Clients Overview
            </h1>
          </div>

          <div className="mt-10 sm:ml-16 sm:mt-0 sm:flex-none">
            <span className="text-sm hover:text-black">View All Clients</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                {columnNames.map((columnName, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`
                        ${index === 0 ? "relative isolate" : ""} 
                        ${index === 0 ? "py-3.5 pr-3" : "px-3 py-3.5"}
                        text-left text-sm font-semibold text-gray-900
                        ${
                          index > 0 && index < 3
                            ? `hidden sm:table-cell md:table-cell`
                            : ""
                        }
                       `}
                  >
                    {columnName}
                    {index === 0 && (
                      <>
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                      </>
                    )}
                    {index === columnNames.length - 1 && (
                      <span className="sr-only">Edit</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {person.name}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {person.industry}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {person.orders}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {person.amount}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {person.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
