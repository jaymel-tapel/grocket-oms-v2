import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../components/tools/buttons/Button";
import { useGetAllUsers } from "../../../services/queries/accountsQueries";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../../../components/tools/searchInput/SearchInput";
import { usersManagerIndexRoute } from "../../routeTree";
import dayjs from "dayjs";
import FiltersButton from "../../../components/tools/buttons/FiltersButton";
import { UsersFiltersType, usersFilters } from "../../routeFilters";
import { debounce } from "lodash";
import UsersManagerTable from "../../../components/accounts/usersManager/UsersManagerTable";
import { getActiveFilterLabel } from "../../../utils/utils";
import { Dialog, DialogTrigger } from "../../../components/tools/dialog/Dialog";
import TransferOrderForm from "../../../components/accounts/usersManager/TransferOrderForm";
import { useUserAuthContext } from "../../../context/UserAuthContext";

const Index = () => {
  const navigate = useNavigate();
  const searchUsers = usersManagerIndexRoute.useSearch();
  const { data } = useGetAllUsers(searchUsers);
  const { user } = useUserAuthContext();

  const keyword = searchUsers?.keyword;
  const dateFrom = searchUsers?.from;
  const dateTo = searchUsers?.to;
  const filter = searchUsers?.filter;

  const [keywordDraft, setKeywordDraft] = useState(keyword ?? "");
  const [open, setOpen] = useState(false);

  const users = useMemo(() => {
    if (!data)
      return {
        data: [],
        pagination: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          next: null,
          prev: null,
        },
      };

    return { data: data.data, pagination: data.meta };
  }, [data]);

  const activeFilterLabel = useMemo(() => {
    return getActiveFilterLabel(filter);
  }, [filter]);

  const handleCreateAccount = () => {
    navigate({ to: "/accounts/users_manager/new" });
  };

  const handleDateChange = (field: "from" | "to", value: string) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          [field]: value,
        };
      },
      params: true,
      replace: true,
    });
  };

  const handleFilterChange = (filter: UsersFiltersType) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          filter: filter,
        };
      },
      params: true,
      replace: true,
    });
  };

  useEffect(() => {
    const handleKeywordChange = debounce(() => {
      navigate({
        search: (old) => {
          return {
            ...old,
            keyword: keywordDraft || undefined,
          };
        },
        params: true,
        replace: true,
      });
    }, 500);

    handleKeywordChange();
    return () => handleKeywordChange.cancel();
    //eslint-disable-next-line
  }, [keywordDraft]);

  return (
    <div>
      <div className="flex max-sm:flex-col gap-4 mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Accounts</p> / <p className="text-[#41B2E9]">Users Manager</p>
          </span>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row max-sm:justify-end">
          {user?.role === "ADMIN" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="default">
                  Transfer Orders
                </Button>
              </DialogTrigger>
              <TransferOrderForm onSuccessHandler={() => setOpen(false)} />
            </Dialog>
          )}

          <Button
            type="button"
            variant="lightBlue"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-8 gap-y-4 flex justify-between max-md:flex-col">
          <div className="flex gap-4 items-center">
            <SearchInput
              placeholder="Search here..."
              className="w-full min-md:max-w-[20rem]"
              grayBg={true}
              value={keywordDraft}
              onChange={(e) => setKeywordDraft(e.target.value)}
            />
            <FiltersButton
              activeFilter={filter}
              label={activeFilterLabel}
              filterOptions={usersFilters}
              handleChange={handleFilterChange}
            />
          </div>
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
              className="block w-full min-md:max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
              className="block w-full min-md:max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <UsersManagerTable users={users.data} pagination={users.pagination} />
      </div>
    </div>
  );
};

export default Index;
