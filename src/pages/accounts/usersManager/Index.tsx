import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../components/tools/buttons/Button";
import UsersManagersTable from "../../../components/accounts/usersManager/UsersManagersTable";
import { useGetAllUsers } from "../../../services/queries/accountsQueries";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../../../components/tools/searchInput/SearchInput";
import { usersManagerIndexRoute } from "../../routeTree";

const Index = () => {
  const navigate = useNavigate();
  const { searchUsers } = usersManagerIndexRoute.useSearch();
  const { data } = useGetAllUsers(searchUsers);

  const keyword = searchUsers?.keyword;
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

  // const handleDateChange = (field: 'date' | 'to', value: string) => {
  //   navigate({
  //     search: (old) => {
  //       return {
  //         ...old,
  //         searchUsers: {
  //           ...old?.searchUsers,
  //           [field]: value,
  //         },
  //       };
  //     },
  //     replace: true,
  //   });
  // }

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
          Add Order
        </Button>
      </div>
      <div className="bg-white">
        <div className="p-8">
          <SearchInput
            placeholder="Search here..."
            className="max-w-[20rem]"
            grayBg={true}
            value={keywordDraft}
            onChange={(e) => setKeywordDraft(e.target.value)}
          />
        </div>
        <UsersManagersTable users={users} />
      </div>
    </div>
  );
};

export default Index;
