import NewOrderForm from "../../../components/orders/_ordersManager/newOrderForm/NewOrderForm";
import OrderFormProvider from "../../../context/NewOrderFormContext";

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
