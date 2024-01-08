import React from "react";
import Table from "../../tools/table/Table";
import TableHead from "../../tools/table/TableHead";
import TableRow from "../../tools/table/TableRow";
import TableHeadCell from "../../tools/table/TableHeadCell";
import TableBody from "../../tools/table/TableBody";
import TableBodyCell from "../../tools/table/TableBodyCell";
import StarsIcons from "../../tools/stars/StarIcons";

const COLUMNS = ["NAME", "RATING", "REVIEW", "ACTION"];
const reviews = [
  {
    name: "John Dela Cruz",
    rating: 1,
    review:
      "Just the usual stuff and very accessible. I hope in their next renovation that theyll upgrade the place into 2 storey.",
    google_review_id: "111",
  },
  {
    name: "Ten Shi",
    rating: 2,
    review: "The burger was fkin raw",
    google_review_id: "112",
  },
];

const ReviewsFromGoogleTable: React.FC = () => {
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
        {reviews.map((review, index) => {
          return (
            <TableRow key={index}>
              <TableBodyCell>{review.name}</TableBodyCell>
              <TableBodyCell>
                <StarsIcons stars={review.rating} showLabels={false} />
              </TableBodyCell>
              <TableBodyCell>{review.review}</TableBodyCell>
              {/* <TableBodyCell></TableBodyCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ReviewsFromGoogleTable;
