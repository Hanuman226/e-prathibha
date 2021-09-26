import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyEmail } from "../../api/userThunk";
import { FancyButton } from "../../Components/StyledComponents";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({ reg_code: "" });
  const { loading } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyEmail(formData))
      .unwrap()
      .then((payload) => {
        const { status, data } = payload;
        status === 200 ? toast.success(data.message) : toast.warn(data);
        status === 200 && setFormData({ reg_code: "" });
        status === 200 && setTimeout(() => history.push("/user/login"), 3000);
      })
      .catch((err) => toast.error(err));
    console.log(formData);
  };
  return (
    <Container>
      <h3>Email Verification</h3>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="verifyEmail">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            type="text"
            name="reg_code"
            placeholder="Please enter verification code in the text box"
            value={formData.reg_code}
            onChange={handleChange}
            required
          />
          <Form.Text className="my-3">
            *please enter the verification code sent to your email address.
          </Form.Text>
        </Form.Group>
        <FancyButton type="submit" className="px-5" disabled={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : "Submit"}
        </FancyButton>
      </Form>
      <Link to="/user/resend_email_verification_code">
        Re-Send Email Verification
      </Link>
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
