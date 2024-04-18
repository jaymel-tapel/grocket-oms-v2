import { useMemo } from "react";
import {
  OrderFormContext,
  useOrderForm,
} from "../../../../context/NewOrderFormContext";
import { isEmpty } from "../../../../utils/utils";

const steps = [
  { id: 1, name: "Select Seller" },
  { id: 2, name: "Select Client" },
  { id: 3, name: "Select Company" },
  { id: 4, name: "Add Reviews" },
  { id: 5, name: "Summary" },
] as const;

const OrderFormSteppers = () => {
  const {
    step: currentStep,
    setStep,
    seller,
    client,
    company,
    reviews,
  } = useOrderForm() as OrderFormContext;

  const isStepDone = useMemo(() => {
    return [
      !isEmpty(seller),
      client.email.length > 0 && client.name.length > 0,
      !isEmpty(company),
      reviews.length > 0,
    ];
  }, [seller, client, company, reviews]);

  const handleClick = (step: number) => {
    setStep(step);
  };

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => {
          // const stepStatus = true;
          return (
            <li key={index} className="md:flex-1">
              {isStepDone[index] ? (
                <div
                  className="cursor-pointer group flex flex-col border-l-4 border-grBlue-light py-2 pl-4 hover:border-grBlue-base md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  onClick={() => handleClick(step.id)}
                >
                  <span className="text-sm font-medium text-grBlue-light group-hover:text-grBlue-base">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-bold">{step.name}</span>
                </div>
              ) : step.id === currentStep ? (
                <div
                  className="cursor-pointer flex flex-col border-l-4 border-grBlue-light py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                  onClick={() => handleClick(step.id)}
                >
                  <span className="text-sm font-medium text-grBlue-light">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-bold">{step.name}</span>
                </div>
              ) : (
                <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-bold">{step.name}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default OrderFormSteppers;
