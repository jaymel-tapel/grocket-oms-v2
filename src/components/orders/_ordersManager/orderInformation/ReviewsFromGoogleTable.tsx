import React from "react";
import Table from "../../../tools/table/Table";
import TableHead from "../../../tools/table/TableHead";
import TableRow from "../../../tools/table/TableRow";
import TableHeadCell from "../../../tools/table/TableHeadCell";
import TableBody from "../../../tools/table/TableBody";
import TableBodyCell from "../../../tools/table/TableBodyCell";
import StarsIcons from "../../../tools/stars/StarIcons";
import { GoogleReview } from "../../../../services/queries/companyQueries";
import Spinner from "../../../tools/spinner/Spinner";

const COLUMNS = ["NAME", "RATING", "REVIEW", "ACTION"];

type TableProps = {
  reviews: GoogleReview[];
  addReview: (name?: string, google_review_id?: string) => void;
  isPending: boolean;
};

const ReviewsFromGoogleTable: React.FC<TableProps> = ({
  reviews,
  addReview,
  isPending,
}) => {
  const handleAddReview = (name: string, google_review_id: string) => {
    addReview(name, google_review_id);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {COLUMNS.map((col, index) => (
            <TableHeadCell key={index}>{col}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {reviews.length === 0 && (
          <TableRow>
            <TableBodyCell className="text-center" colSpan={4}>
              {isPending ? (
                <Spinner className="h-8 w-8 mx-auto" />
              ) : (
                <>
                  No reviews found.
                  <br />
                  Please use valid Google Maps URL.
                </>
              )}
            </TableBodyCell>
          </TableRow>
        )}
        {reviews.map((review, index) => {
          return (
            <TableRow key={index}>
              <TableBodyCell>{review.name}</TableBodyCell>
              <TableBodyCell className="min-w-[8rem]">
                <StarsIcons stars={review.rating} showLabels={false} />
              </TableBodyCell>
              <TableBodyCell>{review.description}</TableBodyCell>
              <TableBodyCell
                className="text-grBlue-dark cursor-pointer font-medium whitespace-nowrap"
                onClick={() =>
                  handleAddReview(review.name, review.google_review_id)
                }
              >
                Add Review
              </TableBodyCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ReviewsFromGoogleTable;
