import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Accordion, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPackageDetails, paymentGateway } from "../../api/packagesSlice";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";
import data from "../../data";
import useToggle from "../../Hooks/useToggle";
import premium_exam_package_img from "../../Icons/premium_package.png";
export default function Checkout() {
  const dispatch = useDispatch();
  const { duration } = useParams();
  const packageData = useSelector((state) => state.packages.packageDetails);

  const [loading, setLoading] = useState(true);
  const [show, toggle] = useToggle();
  useEffect(() => {
    dispatch(getPackageDetails())
      .unwrap()
      .then((_) => setLoading(false))
      .catch((_) => setLoading(false));
  }, []);

  useEffect(() => {
    const year = Number(duration) === 1 ? 1 : "";
    dispatch(paymentGateway({ year }));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const { amount, show_amount, amount_year, show_amount_year, expiry_days } =
    packageData;

  const { exams } = data.packageDetails.premium_package;

  return (
    <Wrapper>
      <h3 className="mb-3">Checkout</h3>
      <Row>
        <Col sm={8}>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="text-uppercase fw-bold fs-6">
                  Review Order
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <p className="border-bottom pb-3 fw-bold">Product</p>
                  <Col sm={4}>
                    <Image src={premium_exam_package_img} fluid />
                  </Col>
                  <Col sm={8}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Package Name: Premium</ListGroup.Item>
                      <ListGroup.Item>Qty : 1</ListGroup.Item>
                      <ListGroup.Item>
                        <p className="mb-0">
                          Amount :
                          <FontAwesomeIcon
                            icon={["fas", "rupee-sign"]}
                            className=" me-2"
                          />
                          {Number(duration) === 6 ? (
                            <>
                              <span className="text-danger fw-bold fs-4  text-decoration-line-through me-2">
                                {show_amount}
                              </span>
                              <span className="text-success fw-bold fs-4">
                                {amount}{" "}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-danger fw-bold fs-4 text-decoration-line-through me-2">
                                {show_amount_year}
                              </span>
                              <span className="text-success fw-bold fs-4">
                                {amount_year}{" "}
                              </span>
                            </>
                          )}
                        </p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Expiry:{" "}
                        {Number(duration) === 6 ? `${expiry_days}` : `365`} Days
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Exams:{" "}
                        {exams.map((item) => {
                          if (exams.length === 1) return item;
                          return `${item} | `;
                        })}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="text-uppercase">
                <span className="text-uppercase fw-bold fs-6">
                  {" "}
                  Make Payment
                </span>
              </Accordion.Header>
              <Accordion.Body className="d-flex justify-content-center">
                <FancyButton>Make Payment</FancyButton>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col sm={4}>
          <FancyButton onClick={toggle} className="my-2 me-auto w-100">
            Apply Coupon
          </FancyButton>
          {show && (
            <div className="d-flex mb-3">
              <Form.Control type="text" className="mx-2" />
              <FancyButton>Apply now</FancyButton>
            </div>
          )}
          <p className="fw-bold text-uppercase mt-3">order summary</p>
          <ListGroup variant="flush" className="text-uppercase">
            <ListGroup.Item className="d-flex justify-content-between">
              Price:
              <span>
                <FontAwesomeIcon
                  icon={["fas", "rupee-sign"]}
                  className=" me-2"
                />
                {Number(duration) === 6 ? amount : amount_year}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              Processing Fees : <span>Free</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between fw-bold">
              Total:{" "}
              <span>{Number(duration) === 6 ? amount : amount_year}</span>
            </ListGroup.Item>
            <ListGroup.Item>Prices are inclusive of all taxes</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Wrapper>
  );
}
