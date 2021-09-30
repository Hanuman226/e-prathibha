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
import { getAllTransactions } from "../../api/packagesSlice";
import TransactionDetailModal from "./TransactionDetailModal";
export default function PaymentDetailsScreen() {
  const [showTransactionModal, toggleTransactionModal] = useToggle();
  const [modalProps, setmodalProps] = useState({});
  const dispatch = useDispatch();
  const pagination = useRef();
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const allTransactions = useSelector(
    (state) => state.packages.allTransactions
  );
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  if (!allTransactions.length) {
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
  let currentData = allTransactions.slice(firstIndex, lastIndex);
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500];

  const totalTransactions = allTransactions.length;
  let entriesLastRange = lastIndex;

  if (currentPage > Math.ceil(totalTransactions / perPage)) {
    setCurrentPage(1);
  }
  if (currentPage === Math.ceil(totalTransactions / perPage)) {
    entriesLastRange =
      totalTransactions - (currentPage - 1) * perPage + firstIndex;
  }

  return (
    <Wrapper>
      <h3 className="pb-3">Payment Details</h3>
      <Row>
        <Col sm={1}>
          <select
            value={perPage}
            className="  mb-3"
            aria-label="select page size"
            onChange={(e) => setPerPage(e.target.value)}
          >
            {perPageOptions
              .filter((option) => option <= totalTransactions)
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
            pageCount={Math.ceil(totalTransactions / perPage)}
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
            {allTransactions.length} entries
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
              <th>Transaction ID</th>
              <th>Payment Gateway Transaction ID</th>
              <th>Amount</th>
              <th>Coupon Discount</th>
              <th>Net Amount</th>
              <th>Date & Time</th>
              <th>Payment Mode</th>
              <th>Remarks</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(({ Payment }, index) => {
              return (
                <tr>
                  <td>{firstIndex + index + 1}</td>
                  <td>{Payment.token}</td>
                  <td>{}</td>
                  <td>{Payment.amount}</td>
                  <td>{}</td>
                  <td>{Payment.amount}</td>
                  <td>{Payment.date}</td>
                  <td>{Payment.name}</td>
                  <td>{Payment.status}</td>
                  <td className="d-flex justify-content-center">
                    <FancyButton
                      onClick={() => {
                        setmodalProps({
                          payment_id: Payment.id,
                        });
                        toggleTransactionModal();
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
              .filter((option) => option <= totalTransactions)
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
            pageCount={Math.ceil(totalTransactions / perPage)}
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
            {allTransactions.length} entries
          </p>
        </Col>
      </Row>
      <TransactionDetailModal
        show={showTransactionModal}
        toggle={toggleTransactionModal}
        data={modalProps}
      />
    </Wrapper>
  );
}
