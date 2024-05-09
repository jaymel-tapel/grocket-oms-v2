import React, { useEffect, useMemo, useState } from "react";
import { useGetAllUsers } from "../../services/queries/accountsQueries";
import { inactiveUsersRoute } from "../routeTree";
import { useNavigate } from "@tanstack/react-router";
import InactiveUsersTable from "../../components/accounts/inactiveUsers/InactiveUsersTable";
import SearchInput from "../../components/tools/searchInput/SearchInput";
import FiltersButton from "../../components/tools/buttons/FiltersButton";
import { getActiveFilterLabel } from "../../utils/utils";
import { UsersFiltersType, usersFilters } from "../routeFilters";
import { debounce } from "lodash";
import CustomDatePicker from "../../components/tools/customDatePicker/CustomDatePicker";

const InactiveUsers: React.FC = () => {
  const navigate = useNavigate();
  const searchUsers = inactiveUsersRoute.useSearch();
  const { data } = useGetAllUsers(searchUsers);

  const keyword = searchUsers?.keyword;
  const dateFrom = searchUsers?.from;
  const dateTo = searchUsers?.to;
  const filter = searchUsers?.filter;

  const [keywordDraft, setKeywordDraft] = useState(keyword ?? "");

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

  const dateValue = useMemo(() => {
    return {
      from: dateFrom ? new Date(dateFrom.replace(/-/g, "/")) : null,
      to: dateTo ? new Date(dateTo.replace(/-/g, "/")) : null,
    };
  }, [dateFrom, dateTo]);

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
      <div>
        <span className="mt-4 mb-6 flex gap-2">
          <p>Accounts</p> / <p className="text-[#41B2E9]">Inactive Users</p>
        </span>
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
            <CustomDatePicker
              label="Start Date:"
              value={dateValue.from}
              onChange={(date) => handleDateChange("from", date)}
            />
            <CustomDatePicker
              label="End Date:"
              value={dateValue.to}
              onChange={(date) => handleDateChange("to", date)}
            />
          </div>
        </div>
        <InactiveUsersTable users={users.data} pagination={users.pagination} />
      </div>
    </div>
  );
};

export default InactiveUsers;
