import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../components/tools/buttons/Button";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../../../components/tools/searchInput/SearchInput";
import { clientsManagerIndexRoute } from "../../routeTree";
import dayjs from "dayjs";
import FiltersButton from "../../../components/tools/buttons/FiltersButton";
import { debounce } from "lodash";
import {
  Client,
  useGetAllClients,
} from "../../../services/queries/clientsQueries";
import ClientsManagersTable from "../../../components/clients/clientsManager/ClientsManagerTable";
import { ClientsFiltersType, clientsFilters } from "../../routeFilters";
import {
  UserLocalInfo,
  getActiveFilterLabel,
  getUserInfo,
} from "../../../utils/utils";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../services/queries/brandsQueries";
import { Dialog, DialogTrigger } from "../../../components/tools/dialog/Dialog";
import TransferClientsForm from "../../../components/clients/clientsManager/TransferClientsForm";

const Index = () => {
  const navigate = useNavigate();
  const searchClients = clientsManagerIndexRoute.useSearch();
  const { data } = useGetAllClients(searchClients);
  const user = getUserInfo() as UserLocalInfo;

  const keyword = searchClients?.keyword;
  const dateFrom = searchClients?.from;
  const dateTo = searchClients?.to;
  const filter = searchClients?.filter;

  const [selectedBrand] = useAtom(brandAtom);
  const [keywordDraft, setKeywordDraft] = useState(keyword ?? "");
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);

  const clients = useMemo(() => {
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
    navigate({ to: "/clients/clients_manager/new" });
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

  const handleFilterChange = (filter: ClientsFiltersType) => {
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

  useEffect(() => {
    if (selectedBrand) {
      navigate({
        search: (old) => {
          return {
            ...old,
            code: selectedBrand?.code,
          };
        },
        params: true,
        replace: true,
      });
    }
    //eslint-disable-next-line
  }, [selectedBrand]);

  if (!selectedBrand) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <span className="text-slate-500">
          Select a brand before you can start viewing clients.
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex max-sm:flex-col gap-4 mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Accounts</p> / <p className="text-[#41B2E9]">Clients Manager</p>
          </span>
        </div>

        <div className="flex gap-4 max-sm:justify-end">
          {user?.role === "ADMIN" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="default"
                  disabled={selectedClients.length === 0}
                >
                  Transfer Clients
                </Button>
              </DialogTrigger>
              <TransferClientsForm
                clients={selectedClients}
                onSuccessHandler={() => {
                  setOpen(false);
                  setSelectedClients([]);
                }}
              />
            </Dialog>
          )}
          <Button
            type="button"
            variant="lightBlue"
            onClick={handleCreateAccount}
          >
            New Client
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
              filterOptions={clientsFilters}
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
        <ClientsManagersTable
          isAdmin={user?.role === "ADMIN" ?? false}
          clients={clients.data}
          pagination={clients.pagination}
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
        />
      </div>
    </div>
  );
};

export default Index;
