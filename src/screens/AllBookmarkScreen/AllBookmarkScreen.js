import { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../../api/allBookmarkThunk";
import {
  FancyButton,
  TableWrapper,
  Wrapper,
} from "../../Components/StyledComponents";
import ReactPaginate from "react-paginate";
import BookmarkViewModal from "./BookmarkViewModal";
import useToggle from "../../Hooks/useToggle";
export default function AllBookmarkScreen() {
  const [showBookmarkViewModal, toggleBookmarkViewModal] = useToggle();
  const [modalProps, setmodalProps] = useState({});
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const { allBookmarks } = useSelector((state) => state.allBookmarks);
  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);

  if (!allBookmarks.length) {
    return <h1>Loading...</h1>;
  }

  const setTopPage = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const setBottomPage = ({ selected }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  let bookmarks = allBookmarks.slice(firstIndex, lastIndex);
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500];

  const totalBookmarkedQuestions = allBookmarks.length;
  let entriesLastRange = lastIndex;

  if (currentPage > Math.ceil(totalBookmarkedQuestions / perPage)) {
    setCurrentPage(1);
  }
  if (currentPage === Math.ceil(totalBookmarkedQuestions / perPage)) {
    entriesLastRange =
      totalBookmarkedQuestions - (currentPage - 1) * perPage + firstIndex;
  }
  return (
    <Wrapper>
      <h3 className="pb-3">All Bookmarks</h3>
      <Row>
        <Col sm={1}>
          <select
            value={perPage}
            className="  mb-3"
            aria-label="select page size"
            onChange={(e) => setPerPage(e.target.value)}
          >
            {perPageOptions
              .filter((option) => option <= totalBookmarkedQuestions)
              .map((option) => (
                <option value={option}>{option}</option>
              ))}
          </select>
        </Col>
        <Col sm={8} className="d-flex justify-content-center">
          <ReactPaginate
            initialPage={0}
            forcePage={currentPage - 1}
            pageCount={Math.ceil(totalBookmarkedQuestions / perPage)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={setTopPage}
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
      <TableWrapper>
        <Table
          striped
          bordered
          hover
          responsive
          className=" align-middle text-center"
        >
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Exam Name</th>
              <th>Subject</th>
              <th>Bookmark Date</th>
              <th>Bookmark Priority</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              const {
                exam_name,
                subject_name,
                date,
                priority,
                exam_result_id,
                question_id,
              } = bookmark;
              let response = bookmark.response;
              if (response === "W") {
                response = "Wrong";
              } else if (response === "R") {
                response = "Right";
              } else {
                response = "Not Attempted";
              }
              return (
                <tr>
                  <td>{firstIndex + index + 1}</td>
                  <td>{exam_name}</td>
                  <td>{subject_name}</td>
                  <td>{date}</td>
                  <td>{priority} </td>
                  <td>{response}</td>
                  <td className="d-flex justify-content-center">
                    <FancyButton
                      onClick={() => {
                        setmodalProps({
                          exam_result_id,
                          qid: question_id,
                          priority: priority,
                          rowIndex: firstIndex + index,
                        });
                        toggleBookmarkViewModal();
                      }}
                    >
                      view
                    </FancyButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <Row>
        <Col sm={1}>
          <select
            value={perPage}
            className="  mb-3"
            aria-label="select page size"
            onChange={(e) => setPerPage(e.target.value)}
          >
            {perPageOptions
              .filter((option) => option <= totalBookmarkedQuestions)
              .map((option) => (
                <option value={option}>{option}</option>
              ))}
          </select>
        </Col>
        <Col sm={8} className="d-flex justify-content-center">
          <ReactPaginate
            initialPage={0}
            forcePage={currentPage - 1}
            pageCount={Math.ceil(totalBookmarkedQuestions / perPage)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={setBottomPage}
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
      <BookmarkViewModal
        show={showBookmarkViewModal}
        toggle={toggleBookmarkViewModal}
        data={modalProps}
      />
    </Wrapper>
  );
}
