import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { FancyButton } from "../../Components/StyledComponents";
import CustomModal from "../../Components/CustomModal";
import useToggle from "../../Hooks/useToggle";
import { Link } from "react-router-dom";
export default function PackageCard(props) {
  const { packageName, exams, price, photo, expiry } = props;
  const [show, toggle] = useToggle();

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
              <span className="text-success fw-bold fs-4">{price}</span>
            </p>
          </Card.Text>

          <div className="d-flex justify-content-around">
            <FancyButton as={Link} to="/">
              <FontAwesomeIcon icon={["fas", "play"]} className="me-2" />
              <span>Start Now</span>
            </FancyButton>
            <FancyButton variant="primary" onClick={toggle}>
              Full Details
            </FancyButton>
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
                  <span className="text-success fw-bold fs-4">{price}</span>
                </p>{" "}
              </ListGroup.Item>
              <ListGroup.Item>Expiry: {expiry}</ListGroup.Item>
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
