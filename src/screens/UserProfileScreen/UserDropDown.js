import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserProfile } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";
import user_img from "../../Icons/user.png";
import auth from "../../utils/auth";
export default function UserDropDown() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const profile = useSelector((state) => state.user.profile);
  return (
    <Container style={{ width: "25rem" }}>
      <Row className="mb-3">
        <Col className="d-flex flex-column align-items-center">
          <Image src={user_img} fluid />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <p className="fw-bold">{profile.name}</p>
          <p className="fw-bold text-primary">{profile.email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FancyButton as={Link} to="/profile">
            my profile
          </FancyButton>
        </Col>
        <Col className="d-flex justify-content-center">
          <FancyButton
            onClick={() => {
              auth.logout(() => {
                return history.push("/user/login");
              });
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "sign-out-alt"]}
              className="me-2 "
              size="2x"
            />
            sign out
          </FancyButton>
        </Col>
      </Row>
    </Container>
  );
}
