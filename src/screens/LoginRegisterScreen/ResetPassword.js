import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { login, resetPassword } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../utils/auth";
const defaultFormData = { password: "", confirmPassword: "" };

export default function ResetPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [formData, setFormData] = useState(defaultFormData);
  const { loading } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(formData))
      .unwrap()
      .then((payload) => {
        const { status, data } = payload;
        const isLoggedIn = status === 200;
        if (isLoggedIn) {
          toast.success(data.Message);
          setFormData(defaultFormData);
          auth.login(() => {
            return history.push("/");
          });
        } else {
          toast.warn(data);
        }
      })
      .catch((err) => toast.error(err));
    console.log(formData);
  };
  return (
    <>
      <Wrapper>
        <h3>Reset Password</h3>
        <Form ref={formRef} className="mb-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <FancyButton type="submit" disabled={loading} className="px-5">
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Login"
              )}
            </FancyButton>
          </div>
        </Form>
        <Link to="/user/login">Click here to login</Link>
      </Wrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
