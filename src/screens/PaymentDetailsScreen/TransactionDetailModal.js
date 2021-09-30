import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetInCorrectQues } from "../../api/InCorrectQuesSlice";
import { resetViewTransaction, viewTransaction } from "../../api/packagesSlice";
import CustomModal from "../../Components/CustomModal";
import { TableWrapper } from "../../Components/StyledComponents";
import { Table } from "react-bootstrap";
export default function TransactionDetailModal(props) {
  const { show, toggle, data } = props;
  const dispatch = useDispatch();
  const { Package } = useSelector((state) => state.packages.viewTransaction);
  useEffect(() => {
    if (data.payment_id) {
      dispatch(viewTransaction({ payment_id: data.payment_id }));
    }
  }, [data.payment_id]);

  const onModalExit = () => {
    dispatch(resetViewTransaction());
  };

  return (
    <CustomModal
      show={show}
      toggle={toggle}
      title={"View Transaction"}
      size="xl"
      onExit={onModalExit}
      backdrop="static"
      keyboard={false}
    >
      {!Package ? (
        <h4>Please Wait...</h4>
      ) : (
        <TableWrapper>
          <Table striped bordered hover responsive className=" text-center">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Exams</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Package[0].name}</td>
                <td>{Package[0].Exam.map((exam) => `${exam.name} | `)}</td>
                <td>{Package[0].PackagesPayment.price}</td>
                <td>{Package[0].PackagesPayment.quantity}</td>
                <td>{Package[0].PackagesPayment.amount}</td>
                <td>{Package[0].PackagesPayment.date}</td>
                <td>{Package[0].PackagesPayment.expiry_date}</td>
              </tr>
              <tr className="fw-bold">
                <td colSpan="2">Total</td>
                <td>{Package[0].PackagesPayment.price}</td>
                <td>{Package[0].PackagesPayment.quantity}</td>
                <td>{Package[0].PackagesPayment.amount}</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </CustomModal>
  );
}
