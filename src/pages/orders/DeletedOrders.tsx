import { useEffect, useMemo } from "react";
import DeletedOrdersTable from "../../components/orders/deletedOrders/DeletedOrdersTable";
import { deletedOrdersRoute } from "../routeTree";
import { useGetDeletedOrders } from "../../services/queries/orderQueries";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import { useNavigate } from "@tanstack/react-router";

const DeletedOrders: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBrand] = useAtom(brandAtom);
  const searchDeletedOrders = deletedOrdersRoute.useSearch();
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

  return (
    <div>
      <div className="mt-4 mb-6">
        <span className="flex gap-2">
          <p>Orders</p> / <p className="text-[#41B2E9]">Deleted Orders</p>
        </span>
      </div>
      <DeletedOrdersTable
        orders={deletedOrders.data}
        pagination={deletedOrders.pagination}
      />
    </div>
  );
};

export default DeletedOrders;
