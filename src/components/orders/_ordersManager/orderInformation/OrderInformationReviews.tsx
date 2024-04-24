import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../../tools/buttons/Button";
import {
  Company,
  PendingReview,
  useGetCompanyReviews,
} from "../../../../services/queries/companyQueries";
import ReviewsFromGoogleTable from "./ReviewsFromGoogleTable";
import toast from "react-hot-toast";
import OrderReviewsTable from "./OrderReviewsTable";
import { useAddOrderReview } from "../../../../services/queries/orderQueries";
import Spinner from "../../../tools/spinner/Spinner";
import { orderRoute } from "../../../../pages/routeTree";

const ADD_REVIEW_METHODS = [
  "Select From Reviews",
  "Manually Add Review",
] as const;

type AddReviewMethods = (typeof ADD_REVIEW_METHODS)[number];
type Props = {
  company: Company;
  reviews: PendingReview[];
};

const OrderInformationReviews: React.FC<Props> = ({ company, reviews }) => {
  const { orderId } = orderRoute.useParams();

  const [selectedMethod, setMethod] = useState<AddReviewMethods>(
    "Select From Reviews"
  );
  const [name, setName] = useState("");
  const [noOfReviews, setNoOfReviews] = useState(10);

  const { companyReviews, getCompanyReviews, isFetchingCompanyReviews } =
    useGetCompanyReviews();
  const { mutateAsync: addReview, isPending: isAddingReview } =
    useAddOrderReview();

  const filteredCompanyReviews = useMemo(() => {
    const _filteredCompanyReviews = companyReviews?.filter(
      (lowRev) =>
        !reviews.some(
          (rev) => lowRev?.google_review_id === rev?.google_review_id
        )
    );
    return _filteredCompanyReviews;
  }, [companyReviews, reviews]);

  const handleGetReviews = () => {
    getCompanyReviews({ url: company.url, quantity: noOfReviews });
  };

  const handleTabClick = (method: AddReviewMethods) => {
    setMethod(method);
  };

  const handleAddReview = async (_name?: string, google_review_id?: string) => {
    if (!_name) {
      if (!name) {
        toast.error("Name cannot be empty");
        return;
      }
    }

    const newReview: PendingReview = {
      name: _name ?? name,
      status: "NEU",
      // id: reviews.length,
    };

    if (google_review_id) {
      newReview.google_review_id = google_review_id;
    }

    await addReview({ ...newReview, orderId });
    setName("");
  };

  useEffect(() => {
    handleGetReviews();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="border-b border-grGray-dark">
      <div className="mt-4">
        <OrderReviewsTable
          orderId={orderId}
          reviews={reviews.sort((a, b) => {
            // Handle undefined 'id'
            if (a.id === undefined) return 1; // Assuming undefined ids should come last
            if (b.id === undefined) return -1; // Assuming undefined ids should come last

            return a.id - b.id; // Ascending order
          })}
          isNewOrder={false}
        />
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
            <div className="mt-4">
              <span className="text-sm font-bold">Results</span>
              <ReviewsFromGoogleTable
                reviews={filteredCompanyReviews}
                addReview={handleAddReview}
                isPending={isFetchingCompanyReviews}
                isNewOrder={false}
              />
            </div>
          </>
        )}

        <div
          className={`my-4 flex ${
            selectedMethod === "Select From Reviews"
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {selectedMethod === "Manually Add Review" && (
            <div className="flex gap-4 items-end">
              <div>
                <label
                  htmlFor="reviewer_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="w-[20rem] mt-2">
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
                disabled={isAddingReview}
                onClick={() => handleAddReview()}
              >
                {isAddingReview ? (
                  <>
                    <Spinner /> Adding Review...
                  </>
                ) : (
                  "Add Review"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInformationReviews;
