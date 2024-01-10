import { useNavigate } from "@tanstack/react-router";
import { useOrderForm } from "./NewOrderFormContext";
import OrderFormSteppers from "./OrderFormSteppers";
import SelectClientForm from "./SelectClientForm";
import SelectSellerForm from "./SelectSellerForm";
import { Button } from "../../../tools/buttons/Button";
import SelectCompanyForm from "./SelectCompanyForm";
import AddReviewsForm from "./AddReviewsForm";
import SummaryForm from "./SummaryForm";

const NewOrderForm = () => {
  const { step } = useOrderForm();

  return (
    <div className="bg-white p-12">
      <OrderFormSteppers />
      <div className="mt-12 mb-8 border-t border-t-gray-300" />
      <div>
        {step === 1 && (
          <SelectSellerForm>
            <FormNavigation />
          </SelectSellerForm>
        )}
        {step === 2 && (
          <SelectClientForm>
            <FormNavigation />
          </SelectClientForm>
        )}
        {step === 3 && (
          <SelectCompanyForm>
            <FormNavigation />
          </SelectCompanyForm>
        )}
        {step === 4 && (
          <AddReviewsForm>
            <FormNavigation />
          </AddReviewsForm>
        )}
        {step === 5 && (
          <SummaryForm>
            <FormNavigation />
          </SummaryForm>
        )}
      </div>
    </div>
  );
};

export default NewOrderForm;

const FormNavigation = () => {
  const { step, setStep } = useOrderForm();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ to: "/orders/orders_manager" });
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="pt-8 border-t border-t-gray-300 flex justify-between">
      <Button type="button" variant="delete" onClick={handleCancel}>
        Cancel
      </Button>
      <div className="flex gap-4">
        {step > 1 && (
          <Button type="button" variant="green" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        <Button type="submit">{step < 5 ? "Next" : "Submit"}</Button>
      </div>
    </div>
  );
};
