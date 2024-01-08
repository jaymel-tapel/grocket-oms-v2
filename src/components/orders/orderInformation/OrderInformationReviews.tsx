import React, { useState } from "react";
import logo from "../../../assets/grocket.png";
import { Button } from "../../tools/buttons/Button";
import ReviewsFromGoogleTable from "./ReviewsFromGoogleTable";
import OrderReviewsTable from "./OrderReviewsTable";

const company = {
  name: "Grocket",
  url: "https://g-rocket.me",
};

const ADD_REVIEW_METHODS = [
  "Select From Reviews",
  "Manually Add Review",
] as const;
type AddReviewMethods = (typeof ADD_REVIEW_METHODS)[number];

const OrderInformationReviews: React.FC = () => {
  const [selectedMethod, setMethod] = useState<AddReviewMethods>(
    "Select From Reviews"
  );

  const handleTabClick = (method: AddReviewMethods) => {
    setMethod(method);
  };

  return (
    <div className="border-b border-grGray-dark">
      <div className="my-8 flex gap-2 items-center">
        <img className="object-cover w-20 mr-2" src={logo} />
        <div className="text-sm flex flex-col">
          <span className="font-medium">{company.name}</span>
          <span>{company.url}</span>
        </div>
      </div>

      <div className="p-3 inline-flex flex-wrap gap-3 border border-grGray-dark shrink-0">
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
          className={`mt-4 flex ${
            selectedMethod === "Select From Reviews"
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {selectedMethod === "Manually Add Review" && (
            <div className="flex gap-4 items-end">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Name</span>
                <input type="text" className="border rounded-sm w-[20rem]" />
              </div>
              <Button type="button" variant="black">
                Add Review
              </Button>
            </div>
          )}
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Total Unit Cost</span>
            <input
              type="number"
              className="mt-2 p-2 border rounded-sm w-[8rem]"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <OrderReviewsTable />
      </div>
    </div>
  );
};

export default OrderInformationReviews;
