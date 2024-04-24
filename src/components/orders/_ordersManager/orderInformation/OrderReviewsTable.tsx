import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../tools/table/Table";
import TableHead from "../../../tools/table/TableHead";
import TableRow from "../../../tools/table/TableRow";
import TableHeadCell from "../../../tools/table/TableHeadCell";
import TableBody from "../../../tools/table/TableBody";
import TableBodyCell from "../../../tools/table/TableBodyCell";
import { Button } from "../../../tools/buttons/Button";
import { PendingReview } from "../../../../services/queries/companyQueries";
import Spinner from "../../../tools/spinner/Spinner";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteOrderReview } from "../../../../services/queries/orderQueries";

const COLUMNS = ["ID", "NAME", "REVIEW STATUS", "ORIGIN", "ACTION"];

const emailTemplates = [
  { name: "Grocket Template 1", _id: "123" },
  { name: "Grocket Template 2", _id: "124" },
];

type Checkbox = {
  id?: number;
  checked: boolean;
};

type Props = {
  reviews: PendingReview[];
  isNewOrder?: boolean;
  handleDeleteLocal?: (index: number) => void;
};

const OrderReviewsTable: React.FC<Props> = ({
  isNewOrder = true,
  reviews,
  handleDeleteLocal,
}) => {
  const [identifier, setIdentifier] = useState<number | null>(null);
  const [checkBoxes, setCheckBoxes] = useState<Checkbox[]>([]);

  const { mutateAsync: deleteReview, isPending } = useDeleteOrderReview();

  const isOneReviewChecked = useMemo(() => {
    return checkBoxes.some((checkbox) => checkbox.checked);
  }, [checkBoxes]);

  const areAllReviewsChecked = useMemo(() => {
    if (checkBoxes.length === 0) return false;
    return checkBoxes.every((checkbox) => checkbox.checked);
  }, [checkBoxes]);

  const handleCheckAllReviews = () => {
    if (!areAllReviewsChecked) {
      const newArray = checkBoxes.map((checkbox) => {
        return { ...checkbox, checked: true };
      });
      setCheckBoxes(newArray);
    } else {
      const newArray = checkBoxes.map((checkbox) => {
        return { ...checkbox, checked: false };
      });
      setCheckBoxes(newArray);
    }
  };

  const handleCheckReview = (id?: number) => {
    setCheckBoxes((prevState) =>
      prevState.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleDeleteClick = async (id: number | undefined, index: number) => {
    if (!window.confirm("Do you wish to delete this review?")) return;
    if (id === undefined) {
      if (!handleDeleteLocal) return;

      handleDeleteLocal(index);
    } else {
      setIdentifier(id);
      await deleteReview(id);
    }

    setIdentifier(null);
  };

  useEffect(() => {
    if (isNewOrder) return;

    if (reviews && reviews.length > 0) {
      const initialBooleans = reviews
        // .slice(currentPage * 5, currentPage * 5 + 5)
        .map((review) => {
          return { id: review.id, checked: false };
        });
      setCheckBoxes(initialBooleans);
    }
  }, [isNewOrder, reviews]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {!isNewOrder && (
              <TableHeadCell>
                <input
                  id={"all"}
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-grGreen-base focus:ring-grGreen-base"
                  checked={areAllReviewsChecked}
                  onChange={handleCheckAllReviews}
                />
              </TableHeadCell>
            )}
            {COLUMNS.map((col, index) => {
              if (isNewOrder && index === 0) return;
              return <TableHeadCell key={index}>{col}</TableHeadCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.length === 0 && (
            <TableRow>
              <TableBodyCell className="text-center" colSpan={6}>
                <p className="text-sm text-gray-400">No data found.</p>
                <p className="text-sm text-gray-400">
                  Add a review to continue.
                </p>
              </TableBodyCell>
            </TableRow>
          )}

          {reviews.map((review, reviewIndex) => {
            const isChecked = checkBoxes[reviewIndex]?.checked || false;
            return (
              <TableRow key={reviewIndex}>
                {!isNewOrder && (
                  <>
                    <TableBodyCell>
                      {review.id && (
                        <input
                          id={review.name}
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-grGreen-base focus:ring-grGreen-base"
                          checked={isChecked}
                          onChange={() => handleCheckReview(review.id)}
                        />
                      )}
                    </TableBodyCell>
                    <TableBodyCell>{review.id}</TableBodyCell>
                  </>
                )}
                <TableBodyCell>{review.name}</TableBodyCell>
                <TableBodyCell>{review.status}</TableBodyCell>
                <TableBodyCell>
                  {review?.google_review_id ? "Selected" : "Manual"}
                </TableBodyCell>
                <TableBodyCell
                  className="text-[#DC3545] cursor-pointer font-medium whitespace-nowrap"
                  onClick={() => handleDeleteClick(review.id, reviewIndex)}
                >
                  {identifier === review.id && isPending ? (
                    <Spinner />
                  ) : (
                    <TrashIcon
                      className="h-4 w-4 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteClick(review.id, reviewIndex)}
                    />
                  )}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {isOneReviewChecked && (
        <div className="my-8 flex justify-between">
          <div />
          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="email_template"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Template
              </label>
              <div className="flex gap-4">
                <select
                  id="email_template"
                  autoComplete="off"
                  className="block w-[12rem] py-1.5 text-gray-900 placeholder:text-gray-400 focus-none"
                >
                  <option disabled>Select category</option>
                  {emailTemplates?.map((template, index) => {
                    return (
                      <option value={`${template._id}`} key={index}>
                        {template.name}
                      </option>
                    );
                  })}
                </select>
                <Button type="button">Send Email</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderReviewsTable;
