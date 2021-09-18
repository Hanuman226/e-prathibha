import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function Pagination(props) {
  const { totalCount, defaultPerPage = 25 } = props;

  const pagination = useRef();
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500];

  let entriesLastRange = lastIndex;
  if (currentPage > Math.ceil(totalCount / perPage)) {
    setCurrentPage(1);
  }
  if (currentPage === Math.ceil(totalCount / perPage)) {
    entriesLastRange = totalCount - (currentPage - 1) * perPage + firstIndex;
  }

  const setPage = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <Row>
      <Col sm={1}>
        <select
          value={perPage}
          className="  mb-3"
          aria-label=".form-select-sm example"
          onChange={(e) => setPerPage(e.target.value)}
        >
          {perPageOptions
            .filter((option) => option <= totalCount)
            .map((option) => (
              <option value={option}>{option}</option>
            ))}
        </select>
      </Col>
      <Col sm={8} className="d-flex justify-content-center">
        <ReactPaginate
          ref={pagination}
          initialPage={0}
          pageCount={Math.ceil(totalCount / perPage)}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={setPage}
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
          Showing {firstIndex + 1} to {entriesLastRange} of{" "}
          {allBookmarks.length} entries
        </p>
      </Col>
    </Row>
  );
}
