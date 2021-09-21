import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import usePagination from "../Hooks/usePagination";

export default function Pagination(props) {
  const { currentPage, totalCount, onPageChange, pageSize, setPageSize } =
    props;
  const [
    firstIndex,
    lastIndex,
    perPageOptions,
    entriesFirstRange,
    entriesLastRange,
  ] = usePagination({ totalCount, pageSize, currentPage });

  console.log({ firstIndex, lastIndex });
  return (
    <Row>
      <Col sm={1}>
        <select
          value={pageSize}
          className="  mb-3"
          aria-label=".form-select-sm example"
          onChange={(e) => {
            setPageSize(e.target.value);
          }}
        >
          {perPageOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </Col>
      <Col sm={8} className="d-flex justify-content-center">
        <ReactPaginate
          initialPage={currentPage - 1}
          forcePage={currentPage - 1}
          pageCount={Math.ceil(totalCount / pageSize)}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={onPageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={<>Prev</>}
          nextLabel={<>Next</>}
        />
      </Col>
      <Col sm={3}>
        <p>
          Showing {entriesFirstRange} to {entriesLastRange} of {totalCount}{" "}
          entries
        </p>
      </Col>
    </Row>
  );
}
