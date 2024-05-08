import React, { ReactNode, useEffect, useMemo, useState } from "react";
import OrderReviewsTable from "../orderInformation/OrderReviewsTable";
import { useOrderForm } from "../../../../context/NewOrderFormContext";
import { Button } from "../../../tools/buttons/Button";
import ReviewsFromGoogleTable from "../orderInformation/ReviewsFromGoogleTable";
import {
  PendingReview,
  useGetCompanyReviews,
} from "../../../../services/queries/companyQueries";
import toast from "react-hot-toast";

const ADD_REVIEW_METHODS = [
  "Manually Add Review",
  "Select From Reviews",
] as const;

type AddReviewMethods = (typeof ADD_REVIEW_METHODS)[number];

type FormProps = {
  children: ReactNode;
};

const OrderFormStep4: React.FC<FormProps> = ({ children }) => {
  const { setStep, client, reviews, setReviews, company } = useOrderForm();
  const [selectedMethod, setMethod] = useState<AddReviewMethods>(
    "Manually Add Review"
  );

  const [name, setName] = useState("");
  const [noOfReviews, setNoOfReviews] = useState(10);

  const { companyReviews, getCompanyReviews, isFetchingCompanyReviews } =
    useGetCompanyReviews();

  const filteredCompanyReviews = useMemo(() => {
    const _filteredCompanyReviews = companyReviews?.filter(
      (lowRev) =>
        !reviews.some(
          (rev) => lowRev?.google_review_id === rev?.google_review_id
        )
    );
    return _filteredCompanyReviews;
  }, [companyReviews, reviews]);

  const reviewsCount = useMemo(() => {
    const manualReviews = reviews.filter((item) => !item.google_review_id);
    const manual = manualReviews.length;
    const selected = reviews.length - manual;

    return { manual, selected };
  }, [reviews]);

  const handleGetReviews = () => {
    getCompanyReviews({ url: company.url, quantity: noOfReviews });
  };

  const handleTabClick = (method: AddReviewMethods) => {
    setMethod(method);
  };

  const handleAddReview = (_name?: string, google_review_id?: string) => {
    if (!_name) {
      if (!name) {
        toast.error("Name cannot be empty");
        return;
      }
    }

    const newReview: PendingReview = {
      name: _name ?? name,
      status: "NEU",
    };

    if (google_review_id) {
      newReview.google_review_id = google_review_id;
    }

    setReviews([...reviews, newReview]);

    setName("");
  };

  const handleDeleteReview = (index: number) => {
    setReviews(reviews.filter((_, reviewIndex) => reviewIndex !== index));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviews.length === 0) return;

    setStep(5);
  };

  useEffect(() => {
    handleGetReviews();
    //eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="-mt-8">
        <OrderReviewsTable
          reviews={reviews}
          handleDeleteLocal={handleDeleteReview}
        />
        <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-row sm:justify-end gap-y-2 sm:gap-x-8">
          <span className="font-semibold text-sm">
            Selected Reviews: {reviewsCount.selected}
          </span>
          <span className="font-semibold text-sm">
            Manual Reviews: {reviewsCount.manual}
          </span>
          <span className="font-semibold text-sm">
            Total Reviews: {reviews.length}
          </span>
          <span className="font-semibold text-sm">
            Total Cost: {reviews.length * client.unit_cost}
          </span>
        </div>
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
            <div className="flex gap-x-4">
              <div>
                <label
                  htmlFor="no_of_reviews"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  No. of Reviews
                </label>
                <div className="w-[8rem] mt-2">
                  <input
                    type="number"
                    id="no_of_reviews"
                    value={noOfReviews}
                    min={0}
                    onChange={(e) => setNoOfReviews(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <Button
                variant="black"
                type="button"
                className="self-end"
                onClick={handleGetReviews}
              >
                Get Reviews
              </Button>
            </div>
            <div className="mt-8">
              <span className="text-sm font-bold">Results</span>
              <ReviewsFromGoogleTable
                reviews={filteredCompanyReviews}
                addReview={handleAddReview}
                isPending={isFetchingCompanyReviews}
              />
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
            <div className="flex gap-4 items-end flex-wrap w-full">
              <div className="sm:max-w-[20rem] w-full">
                <label
                  htmlFor="reviewer_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="reviewer_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="black"
                onClick={() => handleAddReview()}
                className="max-sm:w-full"
              >
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

export default OrderFormStep4;
