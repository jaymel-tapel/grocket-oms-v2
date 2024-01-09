import React, { useEffect, useMemo, useState } from "react";
import Table from "../../tools/table/Table";
import TableHead from "../../tools/table/TableHead";
import TableRow from "../../tools/table/TableRow";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import { Button } from "../../tools/buttons/Button";

const COLUMNS = ["ID", "NAME", "REVIEW STATUS", "ORIGIN", "ACTION"];

const reviews = [
  {
    _id: "100",
    name: "Test 1",
    rating: 1,
    review: "Bad review",
    google_review_id: "111",
    status: "New",
  },
  {
    _id: "101",
    name: "Test 2",
    rating: 2,
    review: "Another review",
    google_review_id: "112",
    status: "New",
  },
];

const emailTemplates = [
  { name: "Grocket Template 1", _id: "123" },
  { name: "Grocket Template 2", _id: "124" },
];

type Checkbox = {
  id: string;
  checked: boolean;
};

const OrderReviewsTable: React.FC = () => {
  const [checkBoxes, setCheckBoxes] = useState<Checkbox[]>([]);

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

  const handleCheckReview = (id: string) => {
    setCheckBoxes((prevState) =>
      prevState.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const initialBooleans = reviews
        // .slice(currentPage * 5, currentPage * 5 + 5)
        .map((review) => {
          return { id: review._id, checked: false };
        });
      setCheckBoxes(initialBooleans);
    }
  }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              <input
                id={"all"}
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-grGreen-base focus:ring-grGreen-base"
                checked={areAllReviewsChecked}
                onChange={handleCheckAllReviews}
              />
            </TableHeadCell>
            {COLUMNS.map((col, index) => (
              <TableHeadCell key={index}>{col}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review, index) => {
            const isChecked = checkBoxes[index]?.checked || false;
            return (
              <TableRow key={index}>
                <TableBodyCell>
                  <input
                    id={review._id}
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-grGreen-base focus:ring-grGreen-base"
                    checked={isChecked}
                    onChange={() => handleCheckReview(review._id)}
                  />
                </TableBodyCell>
                <TableBodyCell>{review._id}</TableBodyCell>
                <TableBodyCell>{review.name}</TableBodyCell>
                <TableBodyCell>{review.status}</TableBodyCell>
                <TableBodyCell>
                  {review?.google_review_id ? "Selected" : "Origin"}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {isOneReviewChecked && (
        <div className="my-8 flex justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Remarks</span>
            <input type="text" className="border rounded-sm w-[20rem]" />
          </div>
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
