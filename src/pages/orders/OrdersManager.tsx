import OrdersManagerTable from "../../components/orders/_ordersManager/OrdersManagerTable";
import { useNavigate } from "@tanstack/react-router";
import { useGetAllOrders } from "../../services/queries/orderQueries";
import { Button } from "../../components/tools/buttons/Button";

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

        <Button type="button" variant="lightBlue" onClick={handleAddOrder}>
          Add Order
        </Button>
      </div>
      <OrdersManagerTable orders={orders ?? []} />
    </div>
  );
};

export default OrdersManager;
