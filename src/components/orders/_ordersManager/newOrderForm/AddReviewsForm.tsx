import React, { ReactNode, useState } from "react";
import OrderReviewsTable from "../../orderInformation/OrderReviewsTable";
import { useOrderForm } from "./NewOrderFormContext";
import { Button } from "../../../tools/buttons/Button";
import ReviewsFromGoogleTable from "../../orderInformation/ReviewsFromGoogleTable";

const ADD_REVIEW_METHODS = [
  "Select From Reviews",
  "Manually Add Review",
] as const;

type AddReviewMethods = (typeof ADD_REVIEW_METHODS)[number];

type FormProps = {
  children: ReactNode;
};

const AddReviewsForm: React.FC<FormProps> = ({ children }) => {
  const { reviews, setReviews } = useOrderForm();
  const [selectedMethod, setMethod] = useState<AddReviewMethods>(
    "Select From Reviews"
  );

  const [name, setName] = useState("");

  const handleTabClick = (method: AddReviewMethods) => {
    setMethod(method);
  };

  const handleAddReview = () => {
    if (!name) return;

    setReviews([
      ...reviews,
      {
        name,
        status: 5,
        _id: "temp",
      },
    ]);
  };

  return (
    <form>
      <div className="-mt-8">
        <OrderReviewsTable reviews={reviews} />
      </div>

      <div className="mt-8 p-3 inline-flex flex-wrap gap-3 border border-grGray-dark shrink-0">
        {ADD_REVIEW_METHODS.map((method, index) => {
          const isActive = selectedMethod === method;

          return (
            <Button
              key={index}
              type="button"
              variant={isActive ? "default" : "inactive"}
              onClick={() => handleTabClick(method)}
            >
              {method}
            </Button>
          );
        })}
      </div>

      <div className="mt-8">
        {selectedMethod === "Select From Reviews" && (
          <>
            <span className="text-sm font-medium">No. of Reviews</span>
            <div className="mt-4 flex gap-4 w-fit items-center">
              <input type="number" className="p-2 border rounded-sm w-[8rem]" />
              <Button variant="black" type="button">
                Get Reviews
              </Button>
            </div>
            <div className="mt-4">
              <span className="text-sm font-bold">Results</span>
              <ReviewsFromGoogleTable />
            </div>
          </>
        )}

        <div
          className={`mt-4 mb-12 flex ${
            selectedMethod === "Select From Reviews"
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {selectedMethod === "Manually Add Review" && (
            <div className="flex gap-4 items-end">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Name</span>
                <input
                  type="text"
                  className="border rounded-sm w-[20rem]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button type="button" variant="black" onClick={handleAddReview}>
                Add Review
              </Button>
            </div>
          )}
        </div>
      </div>

      {children}
    </form>
  );
};

export default AddReviewsForm;
