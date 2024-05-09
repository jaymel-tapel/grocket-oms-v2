import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { ordersManagerIndexRoute } from "../../routeTree";
import { useGetAllOrders } from "../../../services/queries/orderQueries";
import { useNavigate } from "@tanstack/react-router";
import { OrdersFiltersType, ordersFilters } from "../../routeFilters";
import OrdersManagerTable from "../../../components/orders/_ordersManager/OrdersManagerTable";
import FiltersButton from "../../../components/tools/buttons/FiltersButton";
import SearchInput from "../../../components/tools/searchInput/SearchInput";
import { Button } from "../../../components/tools/buttons/Button";
import { getActiveFilterLabel } from "../../../utils/utils";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../services/queries/brandsQueries";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "../../../components/tools/customDatePicker/CustomDatePicker";

const PAYMENT_STATUS = [
  { label: "New", payload: "NEW" },
  { label: "Reminder 1", payload: "PR1" },
  { label: "Reminder 2", payload: "PR2" },
  { label: "Sent Invoice", payload: "SENT_INVOICE" },
  { label: "Paid", payload: "PAID" },
  { label: "Unpaid", payload: "UNPAID" },
] as const;

const REVIEW_STATUS = [
  { label: "Neu", payload: "NEU" },
  { label: "Beauftragt", payload: "BEAUFTRAGT" },
  { label: "Weiterleitung", payload: "WEITERLEITUNG" },
  { label: "Gescheitert", payload: "GESCHEITERT" },
  { label: "Widerspruch", payload: "WIDERSPRUCH" },
  { label: "Geloscht", payload: "GELOSCHT" },
] as const;

const Index = () => {
  const navigate = useNavigate();
  const searchOrders = ordersManagerIndexRoute.useSearch();
  const { data, isLoading, isFetching } = useGetAllOrders(searchOrders);

  const keyword = searchOrders?.keyword;
  const dateFrom = searchOrders?.from;
  const dateTo = searchOrders?.to;
  const filter = searchOrders?.filter;

  const [selectedBrand] = useAtom(brandAtom);
  const [keywordDraft, setKeywordDraft] = useState(keyword ?? "");

  const orders = useMemo(() => {
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

    return {
      data: data.data,
      pagination: data.meta,
      revenue_summary: data.order_revenue_summary,
    };
  }, [data]);

  const dateValue = useMemo(() => {
    return {
      from: dateFrom ? new Date(dateFrom.replace(/-/g, "/")) : null,
      to: dateTo ? new Date(dateTo.replace(/-/g, "/")) : null,
    };
  }, [dateFrom, dateTo]);

  const activeFilterLabel = useMemo(() => {
    return getActiveFilterLabel(filter);
  }, [filter]);

  const handleAddOrder = () => {
    navigate({ to: "/orders/orders-manager/new" });
  };

  const handleResetFilters = () => {
    navigate({
      // to: "/orders/orders-manager/",
      search: {
        showDeleted: false,
        page: 1,
        perPage: 10,
        code: selectedBrand?.code,
      },
      params: true,
      replace: true,
    });

    setKeywordDraft("");
  };

  const handleDateChange = (field: "from" | "to", value: string) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          [field]: value === "Invalid Date" ? undefined : value,
        };
      },
      params: true,
      replace: true,
    });
  };

  const handleFilterChange = (filter: OrdersFiltersType) => {
    const keyword =
      filter === "payment_status"
        ? "NEW"
        : filter === "review_status"
        ? "NEU"
        : "";

    setKeywordDraft("");

    navigate({
      search: (old) => {
        return {
          ...old,
          keyword,
          filter: filter,
        };
      },
      params: true,
      replace: true,
    });
  };

  const handleSelectDropdown = (filter: string) => {
    setKeywordDraft(filter);
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
          Select a brand before you can start viewing orders.
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Orders</p> / <p className="text-[#41B2E9]">Orders Manager</p>
          </span>
        </div>

        <Button type="button" variant="lightBlue" onClick={handleAddOrder}>
          New Order
        </Button>
      </div>
      <div className="bg-white">
        <div className="p-8 gap-y-4 flex justify-between items-end max-md:flex-col">
          <div className="flex gap-4 items-center">
            {filter === "payment_status" || filter === "review_status" ? (
              <select
                onChange={(e) => handleSelectDropdown(e.target.value)}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              >
                {filter === "payment_status" &&
                  PAYMENT_STATUS.map((status, index) => (
                    <option value={status.payload} key={index}>
                      {status.label}
                    </option>
                  ))}
                {filter === "review_status" &&
                  REVIEW_STATUS.map((status, index) => (
                    <option value={status.payload} key={index}>
                      {status.label}
                    </option>
                  ))}
              </select>
            ) : (
              <SearchInput
                placeholder="Search here..."
                className="w-full min-md:max-w-[20rem]"
                grayBg={true}
                value={keywordDraft}
                onChange={(e) => setKeywordDraft(e.target.value)}
              />
            )}
            <FiltersButton
              activeFilter={filter}
              label={activeFilterLabel}
              filterOptions={ordersFilters}
              handleChange={handleFilterChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleResetFilters}
              className="text-gray-400 hover:text-gray-600"
            >
              Reset
            </Button>
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
        <OrdersManagerTable
          page={searchOrders.page}
          orders={orders.data}
          pagination={orders.pagination}
          isSearching={isLoading}
          isUpdatingTable={isFetching}
        />
      </div>

      <div className="py-8 flex flex-col lg:flex-row gap-4 justify-between text-gray-500">
        <div className="flex items-end gap-2">
          <span className="font-medium">TOTAL:</span>
          <span className="font-bold text-2xl">
            €{orders?.revenue_summary?.total?.toLocaleString() ?? 0}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-medium">COMMISSIONS:</span>
          <span className="font-bold text-2xl">
            €
            {orders?.revenue_summary?.current_commission?.toLocaleString() ?? 0}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-medium">TOTAL:</span>
          <span className="font-bold text-2xl">
            €{orders?.revenue_summary?.paid_commission?.toLocaleString() ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
