import NewOrderForm from "../../components/orders/_ordersManager/newOrderForm/NewOrderForm";
import OrderFormProvider from "../../components/orders/_ordersManager/newOrderForm/NewOrderFormContext";

const AddNewOrderPage = () => {
  return (
    <div>
      <OrderFormProvider>
        <NewOrderForm />
      </OrderFormProvider>
    </div>
  );
};

export default AddNewOrderPage;
