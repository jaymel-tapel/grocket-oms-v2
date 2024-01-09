import { useOrderForm } from "./NewOrderFormContext";
import OrderFormSteppers from "./OrderFormSteppers";
import SelectSellerForm from "./SelectSellerForm";

const NewOrderForm = () => {
  const { step } = useOrderForm();
  console.log(step);
  return (
    <div className="bg-white p-8">
      <OrderFormSteppers />
      <div className="my-8 border-t border-t-gray-300" />
      <div className="">
        {step === 1 && <SelectSellerForm />}
        {step === 2 && <>Done</>}
      </div>
    </div>
  );
};

export default NewOrderForm;
