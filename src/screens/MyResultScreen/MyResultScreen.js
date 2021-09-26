import { useState, useEffect, useRef } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  FancyButton,
  TableWrapper,
  Wrapper,
} from "../../Components/StyledComponents";
import ReactPaginate from "react-paginate";
import { getMyResult } from "../../api/myResultThunk";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyResultScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pagination = useRef();
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const { myResult } = useSelector((state) => state.myResult);
  useEffect(() => {
    dispatch(getMyResult());
  }, []);

  if (!myResult.length) {
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
  const currentData = myResult.slice(firstIndex, lastIndex);
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500];

  const totalCount = myResult.length;
  let entriesLastRange = lastIndex;

  if (currentPage > Math.ceil(totalCount / perPage)) {
    setCurrentPage(1);
  }
  if (currentPage === Math.ceil(totalCount / perPage)) {
    entriesLastRange = totalCount - (currentPage - 1) * perPage + firstIndex;
  }

  return (
    <>
      <FancyButton
        className="mb-3"
        onClick={() => {
          history.push("/over_all_report");
        }}
      >
        <FontAwesomeIcon icon={["fas", "compass"]} className="me-2" size="2x" />{" "}
        overall report
      </FancyButton>
      <Wrapper>
        <h3 className="pb-3">My Result</h3>
        <Row>
          <Col sm={1}>
            <select
              value={perPage}
              className="  mb-3"
              aria-label="select page size"
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
              forcePage={currentPage - 1}
              pageCount={Math.ceil(totalCount / perPage)}
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
              Showing {firstIndex + 1} to {entriesLastRange} of {totalCount}{" "}
              entries
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
                <th>Attempt Date</th>
                <th>Marks Scored/Max Marks</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(({ Exam, Result }, index) => {
                return (
                  <tr>
                    <td>{firstIndex + index + 1}</td>
                    <td>{Exam.name}</td>
                    <td>{Result.start_time}</td>
                    <td>
                      {Result.obtained_marks}/ {Result.total_marks}
                    </td>
                    <td>{Result.percent}</td>
                    <td className="d-flex justify-content-center">
                      <FancyButton as={Link} to={`my_result/view/${Result.id}`}>
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
              forcePage={currentPage - 1}
              pageCount={Math.ceil(totalCount / perPage)}
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
              Showing {firstIndex + 1} to {entriesLastRange} of {totalCount}{" "}
              entries
            </p>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}
