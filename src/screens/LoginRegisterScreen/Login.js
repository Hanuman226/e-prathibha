import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../utils/auth";
const defaultFormData = { email: "", password: "" };

export default function Login() {
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
    dispatch(login(formData))
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
        <Form ref={formRef} className="mb-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
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
            <FancyButton onClick={() => formRef.current.reset()}>
              Reset
            </FancyButton>
          </div>
        </Form>
        <Link to="/user/resend_email_verification_code">
          Re-Send Email Verification
        </Link>
        <Link to="/user/forgot_password" className="ms-3">
          Forgot Password?
        </Link>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/user/register">New User? Create Account</Link>
        </p>
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
