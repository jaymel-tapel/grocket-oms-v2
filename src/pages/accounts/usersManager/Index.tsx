import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../components/tools/buttons/Button";
import UsersManagersTable from "../../../components/accounts/usersManager/UsersManagersTable";
import { useGetAllUsers } from "../../../services/queries/accountsQueries";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../../../components/tools/searchInput/SearchInput";
import { usersManagerIndexRoute } from "../../routeTree";
import dayjs from "dayjs";

const Index = () => {
  const navigate = useNavigate();
  const { searchUsers } = usersManagerIndexRoute.useSearch();
  const { data } = useGetAllUsers(searchUsers);

  const keyword = searchUsers?.keyword;
  const dateFrom = searchUsers?.from;
  const dateTo = searchUsers?.to;

  // const filter = searchUsers?.filter;
  const [keywordDraft, setKeywordDraft] = useState(keyword ?? "");

  const users = useMemo(() => {
    if (!data) return [];

    const users = data?.edges.map((edge) => edge.node);
    return users;
  }, [data]);

  const handleCreateAccount = () => {
    navigate({ to: "/accounts/new" });
  };

  const handleDateChange = (field: "from" | "to", value: string) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          searchUsers: {
            ...old?.searchUsers,
            [field]: value,
          },
        };
      },
      replace: true,
    });
  };

  // const handleFilterChange = (filter: string) => {
  //   navigate({
  //     search: (old) => {
  //       return {
  //         ...old,
  //         searchUsers: {
  //           ...old?.searchUsers,
  //           filter: filter,
  //         },
  //       };
  //     },
  //     replace: true,
  //   });
  // }

  useEffect(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          searchUsers: {
            ...old?.searchUsers,
            keyword: keywordDraft || undefined,
            first: 10,
            after: 10,
          },
        };
      },
      replace: true,
    });
    //eslint-disable-next-line
  }, [keywordDraft]);

  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Accounts</p> / <p className="text-[#41B2E9]">Users Manager</p>
          </span>
        </div>

        <Button type="button" variant="lightBlue" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </div>
      <div className="bg-white">
        <div className="p-8 flex justify-between">
          <SearchInput
            placeholder="Search here..."
            className="max-w-[20rem]"
            grayBg={true}
            value={keywordDraft}
            onChange={(e) => setKeywordDraft(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="text"
              id="dateFrom"
              placeholder="Start Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              defaultValue={dateFrom}
              onChange={(e) =>
                handleDateChange(
                  "from",
                  dayjs(e.target.value).format("MM-DD-YYYY")
                )
              }
              className="block w-full max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              id="dateTo"
              placeholder="End Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              defaultValue={dateTo}
              onChange={(e) =>
                handleDateChange(
                  "to",
                  dayjs(e.target.value).format("MM-DD-YYYY")
                )
              }
              className="block w-full max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <UsersManagersTable users={users} />
      </div>
    </div>
  );
};

export default Index;
