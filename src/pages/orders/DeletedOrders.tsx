import { useMemo } from "react";
import DeletedOrdersTable from "../../components/orders/deletedOrders/DeletedOrdersTable";
import { deletedOrdersRoute } from "../routeTree";
import { useGetDeletedOrders } from "../../services/queries/orderQueries";

const DeletedOrders: React.FC = () => {
  const { searchDeletedOrders } = deletedOrdersRoute.useSearch();
  const { data } = useGetDeletedOrders(searchDeletedOrders);

  const deletedOrders = useMemo(() => {
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
    <DeletedOrdersTable
      orders={deletedOrders.data}
      pagination={deletedOrders.pagination}
    />
  );
};

export default DeletedOrders;
