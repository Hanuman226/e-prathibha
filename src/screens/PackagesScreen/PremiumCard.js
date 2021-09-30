import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { FancyButton } from "../../Components/StyledComponents";
import CustomModal from "../../Components/CustomModal";
import useToggle from "../../Hooks/useToggle";
import { StyledSelect } from "../../Components/StyledComponents";
import { Link } from "react-router-dom";
export default function PremiumCard(props) {
  const {
    packageName,
    exams,
    photo,
    expiry,
    amount,
    show_amount,
    amount_year,
    show_amount_year,
  } = props;
  const [show, toggle] = useToggle();
  const [duration, setDuration] = useState(6);
  const handleChange = (e) => {
    setDuration(Number(e.target.value));
  };
  return (
    <>
      <Card
        style={{ width: "18rem" }}
        className="d-flex flex-column justify-content-between"
      >
        <Card.Img variant="top" src={photo} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{packageName}</Card.Title>
          <Card.Text>
            <p className="fw-bold">
              Exams :
              {exams.slice(0, 10).map((item) => {
                if (exams.length === 1) return item;
                return `${item} | `;
              })}
              {exams.length !== 1 && "..."}
            </p>

            <p>
              <FontAwesomeIcon icon={["fas", "rupee-sign"]} className=" me-2" />

              {duration === 6 ? (
                <>
                  <span className="text-danger fw-bold fs-4  text-decoration-line-through me-2">
                    {show_amount}
                  </span>
                  <span className="text-success fw-bold fs-4">{amount} </span>
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
          </Card.Text>

          <StyledSelect
            className="form-select mb-3 "
            aria-label="choose duration"
            value={duration}
            onChange={handleChange}
            id="duration"
          >
            <option value="6">6 Months</option>
            <option value="1">1 Year</option>
          </StyledSelect>
          <div className="d-flex justify-content-around">
            <FancyButton as={Link} to={`/checkout/${duration}`}>
              <FontAwesomeIcon icon={["fas", "play"]} className="me-2" />
              <span>Checkout</span>
            </FancyButton>
            <FancyButton onClick={toggle}>Full Details</FancyButton>
          </div>
        </Card.Body>
      </Card>
      <CustomModal
        show={show}
        toggle={toggle}
        title={"Package Details"}
        size="xl"
      >
        <Row>
          <Col sm={4}>
            <Image src={photo} fluid />
          </Col>
          <Col sm={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>Package Name: {packageName}</ListGroup.Item>
              <ListGroup.Item>
                <p className="mb-0">
                  Amount :
                  <FontAwesomeIcon
                    icon={["fas", "rupee-sign"]}
                    className=" me-2"
                  />
                  {duration === 6 ? (
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
                Expiry: {duration === 6 ? `${expiry}` : `365`} Days
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
      </CustomModal>
    </>
  );
}
