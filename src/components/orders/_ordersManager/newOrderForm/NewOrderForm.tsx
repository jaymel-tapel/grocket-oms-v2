import { useNavigate } from "@tanstack/react-router";
import { useIsMutating } from "@tanstack/react-query";

import { useOrderForm } from "../../../../context/NewOrderFormContext";
import OrderFormSteppers from "./OrderFormSteppers";
import OrderFormStep1 from "./OrderFormStep1";
import OrderFormStep2 from "./OrderFormStep2";
import OrderFormStep3 from "./OrderFormStep3";
import OrderFormStep4 from "./OrderFormStep4";
import OrderFormStep5 from "./OrderFormStep5";
import { Button } from "../../../tools/buttons/Button";
import Spinner from "../../../tools/spinner/Spinner";
import { useMemo } from "react";
import { isEmpty } from "../../../../utils/utils";
import { newOrderRoute } from "../../../../pages/routeTree";

const NewOrderForm = () => {
  const { step } = useOrderForm();
  const newOrderParams = newOrderRoute.useSearch();

  const stepLabel = useMemo(() => {
    switch (step) {
      case 1:
        return "Select Seller";
      case 2:
        return "Select Client";
      case 3:
        return "Select Company";
      case 4:
        return "Add Reviews";
      case 5:
        return "Summary";
      default:
        return "";
    }
  }, [step]);

  return (
    <div className="bg-white p-8 sm:p-12">
      <div className="md:hidden text-grBlue-base">
        Step {step}: {stepLabel}
      </div>
      <div className="hidden md:block">
        <OrderFormSteppers />
      </div>
      <div className="mt-12 mb-8 border-t border-t-gray-300" />
      <div>
        {step === 1 && (
          <OrderFormStep1 clientData={newOrderParams.clientData ?? false}>
            <FormNavigation />
          </OrderFormStep1>
        )}
        {step === 2 && (
          <OrderFormStep2 clientData={newOrderParams.clientData ?? false}>
            <FormNavigation />
          </OrderFormStep2>
        )}
        {step === 3 && (
          <OrderFormStep3>
            <FormNavigation />
          </OrderFormStep3>
        )}
        {step === 4 && (
          <OrderFormStep4>
            <FormNavigation />
          </OrderFormStep4>
        )}
        {step === 5 && (
          <OrderFormStep5>
            <FormNavigation />
          </OrderFormStep5>
        )}
      </div>
    </div>
  );
};

export default NewOrderForm;

const FormNavigation = () => {
  const { step, setStep, seller, client, company, reviews } = useOrderForm();
  const isSubmitting = useIsMutating({ mutationKey: ["create-order"] });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ to: "/orders/orders-manager" });
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const isSubmitDisabled = useMemo(() => {
    if (step === 1 && !isEmpty(seller)) {
      return false;
    } else if (
      step === 2 &&
      client.email.length > 0 &&
      client.name.length > 0
    ) {
      return false;
    } else if (step === 3 && !isEmpty(company)) {
      return false;
    } else if (step === 4 && reviews.length > 0) {
      return false;
    } else if (step === 5) {
      return false;
    } else {
      return true;
    }
  }, [seller, client, company, reviews, step]);

  return (
    <div className="pt-8 border-t border-t-gray-300 flex gap-4 max-sm:flex-col justify-between">
      <Button type="button" variant="delete" onClick={handleCancel}>
        Cancel
      </Button>
      <div className="flex gap-4 max-sm:flex-col">
        {step > 1 && (
          <Button type="button" variant="green" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting > 0 || isSubmitDisabled}>
          {isSubmitting > 0 && <Spinner />}
          {step < 5 ? "Next" : "Submit"}
        </Button>
      </div>
    </div>
  );
};
