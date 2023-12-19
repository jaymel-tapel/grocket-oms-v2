import { Outlet } from "@tanstack/react-router";
import SelectSellerForm from "../../components/orders/_ordersManager/newOrderForm/SelectSellerForm";

const AddNewOrderPage = () => {
  return (
    <>
      <Outlet />
      <SelectSellerForm />
    </>
  );
};

export default AddNewOrderPage;
