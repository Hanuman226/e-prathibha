import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { reSendEmailVerifyCode } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";
export default function ResendEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "" });
  const { loading } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reSendEmailVerifyCode(formData))
      .unwrap()
      .then((payload) => {
        const { status, data } = payload;
        status === 200 ? toast.success(data) : toast.warn(data);
        status === 200 && setFormData({ email: "" });
        status === 200 &&
          setTimeout(() => history.push("/user/verify_email"), 2000);
      })
      .catch((err) => toast.error(err));
    console.log(formData);
  };
  return (
    <Container>
      <h3>Re-Send Email Verification</h3>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="resendEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email Id which you enter at the time of registration"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <FancyButton type="submit" className="px-5" disabled={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : "Submit"}
        </FancyButton>
      </Form>
      <Link to="/user/login">Click here to login</Link>
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
