import OrdersManagerTable from "../../components/orders/_ordersManager/OrdersManagerTable";
import { useNavigate } from "@tanstack/react-router";
import { useGetAllOrders } from "../../services/queries/orderQueries";

const OrdersManager: React.FC = () => {
  const navigate = useNavigate();

  const { data: orders } = useGetAllOrders();

  const handleAddOrder = () => {
    navigate({ to: "/orders/new" });
  };

  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Orders</p> / <p className="text-[#41B2E9]">Orders Manager</p>
          </span>
        </div>

        <button
          type="button"
          className="rounded-md bg-[#41B2E9] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>
      <OrdersManagerTable orders={orders} />
    </div>
  );
};

export default OrdersManager;
