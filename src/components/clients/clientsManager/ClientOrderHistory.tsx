import React, { useMemo, useState } from "react";
import {
  OrdersParams,
  useGetAllOrders,
} from "../../../services/queries/orderQueries";
import ClientOrderHistoryTable from "./ClientOrderHistoryTable";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../../services/queries/brandsQueries";

type Props = {
  clientEmail: string;
};

const ClientOrderHistory: React.FC<Props> = ({ clientEmail }) => {
  const [selectedBrand] = useAtom(brandAtom);

  const [search, setSearch] = useState<OrdersParams>({
    code: selectedBrand?.code ?? "",
    filter: "client",
    keyword: clientEmail,
    page: 1,
    perPage: 10,
  });

  const { data, isFetching } = useGetAllOrders(search);

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

    return { data: data.data, pagination: data.meta };
  }, [data]);

  return (
    <div>
      <ClientOrderHistoryTable
        orders={orders.data}
        pagination={orders.pagination}
        isSearching={isFetching}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default ClientOrderHistory;
