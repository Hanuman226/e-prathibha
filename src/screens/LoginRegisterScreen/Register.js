import React from "react";
import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  phone: "",
  securityCode: "",
};
export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(defaultFormData);
  const [fileSelected, setFileSelected] = useState({});
  const { email, name, password, confirmPassword, phone, securityCode } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...formData, photo: fileSelected }))
      .unwrap()
      .then((payload) => {
        const { status, data } = payload;
        console.log({ payload });
        status === 200 ? toast.success(data) : toast.warn(data);
        status === 200 && setFormData(defaultFormData);
        status === 200 &&
          setTimeout(() => history.push("/user/verify_email"), 2000);
      })
      .catch((err) => toast.error(err));
    console.log(formData);
  };

  return (
    <Container>
      <Form className="mb-3" onSubmit={handleSubmit} onChange={handleChange}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm_password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mobile_number">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={phone}
            placeholder="Mobile Number"
            required
          />
        </Form.Group>

        <Form.Group controlId="avatar" className="mb-3">
          <Form.Label>Choose Photo</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={(e) => {
              setFileSelected(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group controlId="security_question" className="mb-3">
          <Form.Label>Answer simple math: 6*5=?</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={securityCode}
            placeholder="Enter security code shown above"
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <FancyButton type="submit" disabled={loading} className="px-5">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "submit"
            )}
          </FancyButton>
          <FancyButton onClick={() => setFormData(defaultFormData)}>
            Reset
          </FancyButton>
        </div>
      </Form>
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
    </Container>
  );
}
