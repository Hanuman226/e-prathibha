import { useState, useEffect, useRef } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  FancyButton,
  TableWrapper,
  Wrapper,
} from "../../Components/StyledComponents";
import ReactPaginate from "react-paginate";
import useToggle from "../../Hooks/useToggle";
import { getAllIncorrectQuestions } from "../../api/InCorrectQuesThunk";
import InCorrectQuesModal from "./InCorrectQuesModal";
import styled from "styled-components";
export default function InCorrectQuesScreen() {
  const [showInCorrectQuesModal, toggleInCorrectQuesModal] = useToggle();
  const [modalProps, setmodalProps] = useState({});
  const dispatch = useDispatch();
  const pagination = useRef();
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const studentId = useSelector((state) => state.user.userInfo.Id);
  const { inCorrectQuestions } = useSelector((state) => state.inCorrectQues);
  useEffect(() => {
    dispatch(getAllIncorrectQuestions({ id: studentId }));
  }, []);

  if (!inCorrectQuestions.length) {
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
  let inCorrectQues = inCorrectQuestions.slice(firstIndex, lastIndex);
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500];

  const totalInCorrectQuestions = inCorrectQuestions.length;
  let entriesLastRange = lastIndex;

  if (currentPage > Math.ceil(totalInCorrectQuestions / perPage)) {
    setCurrentPage(1);
  }
  if (currentPage === Math.ceil(totalInCorrectQuestions / perPage)) {
    entriesLastRange =
      totalInCorrectQuestions - (currentPage - 1) * perPage + firstIndex;
  }

  return (
    <Wrapper>
      <h3 className="pb-3">InCorrect Questions</h3>
      <Row>
        <Col sm={1}>
          <select
            value={perPage}
            className="  mb-3"
            aria-label="select page size"
            onChange={(e) => setPerPage(e.target.value)}
          >
            {perPageOptions
              .filter((option) => option <= totalInCorrectQuestions)
              .map((option) => (
                <option value={option}>{option}</option>
              ))}
          </select>
        </Col>
        <Col sm={8} className="d-flex justify-content-center">
          <ReactPaginate
            ref={pagination}
            initialPage={0}
            forcePage={currentPage - 1}
            pageCount={Math.ceil(totalInCorrectQuestions / perPage)}
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
            {inCorrectQuestions.length} entries
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
              <th>Date</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inCorrectQues.map((question, index) => {
              const {
                exam_name,
                subject_name,
                date,
                exam_result_id,
                question_id,
              } = question;
              let response = question.response;
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
                  <td>{response}</td>
                  <td className="d-flex justify-content-center">
                    <FancyButton
                      onClick={() => {
                        setmodalProps({
                          id: studentId,
                          exam_result_id,
                          qid: question_id,
                        });
                        toggleInCorrectQuesModal();
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
              .filter((option) => option <= totalInCorrectQuestions)
              .map((option) => (
                <option value={option}>{option}</option>
              ))}
          </select>
        </Col>
        <Col sm={8} className="d-flex justify-content-center">
          <ReactPaginate
            ref={pagination}
            initialPage={0}
            forcePage={currentPage - 1}
            pageCount={Math.ceil(totalInCorrectQuestions / perPage)}
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
            {inCorrectQuestions.length} entries
          </p>
        </Col>
      </Row>
      <InCorrectQuesModal
        show={showInCorrectQuesModal}
        toggle={toggleInCorrectQuesModal}
        data={modalProps}
      />
    </Wrapper>
  );
}
