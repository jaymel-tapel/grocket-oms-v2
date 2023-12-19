import { Outlet } from "@tanstack/react-router";
import SelectSellerForm from "../../components/orders/OrdersManager/newOrderForm/SelectSellerForm";

const AddNewOrderPage = () => {
  return (
    <>
      <Outlet />
      <SelectSellerForm />
    </>
  );
};

export default AddNewOrderPage;
