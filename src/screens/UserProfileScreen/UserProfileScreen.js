import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  ListGroup,
  Nav,
  Row,
  Spinner,
  Tab,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  changePassword,
  getUserProfile,
  updateProfile,
} from "../../api/userThunk";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";
export default function UserProfileScreen() {
  return (
    <Container fluid>
      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
        <Row>
          <Col
            sm={12}
            md={2}
            lg={2}
            className="border  shadow-lg rounded-2 py-2 h-25"
          >
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="border-bottom">
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item className="border-bottom">
                <Nav.Link eventKey="editProfile">Edit Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item className="border-bottom">
                <Nav.Link eventKey="changePhoto">Change Photo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="changePassword">Change Password</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} md={10} lg={10}>
            <Wrapper className="mt-md-0 mt-5">
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <MyProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="editProfile">
                  <EditProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="changePhoto">
                  <UpdatePhoto />
                </Tab.Pane>
                <Tab.Pane eventKey="changePassword">
                  <ChangePassword />
                </Tab.Pane>
              </Tab.Content>
            </Wrapper>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

const MyProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <Container>
      <h3>My Profile</h3>
      {!profile ? (
        <h2>Loading...</h2>
      ) : (
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item className="text-primary">
                Full Name
              </ListGroup.Item>
              <ListGroup.Item>{profile.name}</ListGroup.Item>
              <ListGroup.Item className="text-primary">
                Registered Email
              </ListGroup.Item>
              <ListGroup.Item>{profile.email}</ListGroup.Item>
              <ListGroup.Item className="text-primary">
                Enrollment No
              </ListGroup.Item>
              <ListGroup.Item>{profile.enrollment_no}</ListGroup.Item>
              <ListGroup.Item className="text-primary">Address</ListGroup.Item>
              <ListGroup.Item>{profile.address}</ListGroup.Item>
              <ListGroup.Item className="text-primary">Groups</ListGroup.Item>
              <ListGroup.Item>
                {profile.group[0].Groups.group_name}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item className="text-primary">
                Phone Number
              </ListGroup.Item>
              <ListGroup.Item>{profile.phone}</ListGroup.Item>
              <ListGroup.Item className="text-primary">
                Alternate Number
              </ListGroup.Item>
              <ListGroup.Item>{profile.altenatephone}</ListGroup.Item>
              <ListGroup.Item className="text-primary">
                Admission Date
              </ListGroup.Item>
              <ListGroup.Item>{profile.admission_date}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const defaultData = {
    enroll: profile.enrollment_no,
    phone: profile.phone,
    alternate_phone: profile.altenatephone,
    address: profile.address,
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    setFormData(defaultData);
  }, [profile]);

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  const { enroll, phone, alternate_phone, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    dispatch(updateProfile(formData))
      .unwrap()
      .then((res) => {
        toast.success("Updated Successfully");
        setUpdating(false);
        console.log({ res });
        dispatch(getUserProfile());
      })
      .catch((err) => setUpdating(false));
    console.log(formData);
  };
  return (
    <Container>
      <h3>Edit Profile</h3>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Form.Group className="mb-3" controlId="enrollmentNo">
          <Form.Label>Enrollment No</Form.Label>
          <Form.Control
            type="text"
            name="enroll"
            value={enroll}
            placeholder="Enrollment No"
            className="shadow-none"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={phone}
            placeholder="Phone Number"
            className="shadow-none"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="alternateNumber">
          <Form.Label>Alternate Number</Form.Label>
          <Form.Control
            type="tel"
            name="alternate_phone"
            value={alternate_phone}
            placeholder="Alternate Number"
            className="shadow-none"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            className="shadow-none"
          />
        </Form.Group>

        <FancyButton type="submit" disabled={updating} className="px-5">
          {updating ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <>
              <FontAwesomeIcon icon={["fas", "sync-alt"]} className="me-2" />
              <span> Update</span>
            </>
          )}
        </FancyButton>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
};

const UpdatePhoto = () => {
  const [fileSelected, setFileSelected] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <h3>Change Photo</h3>
      <Form>
        <Form.Group
          controlId="avatar"
          className="mb-3"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <Form.Label>Choose Photo</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={(e) => {
              setFileSelected(e.target.files[0]);
            }}
          />
        </Form.Group>
        <FancyButton type="submit">
          <FontAwesomeIcon icon={["fas", "sync-alt"]} className="me-2" />
          Update
        </FancyButton>
      </Form>
    </>
  );
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldPassword, newPassword, confirmPassword } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password does not match");
      return;
    }
    dispatch(changePassword({ password: formData.newPassword }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        toast.success(res);
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => setLoading(false));
  };
  return (
    <>
      <h3>Change Password</h3>
      <Form className="mb-3" onSubmit={handleSubmit} onChange={handleChange}>
        <Form.Group className="mb-3" controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            className="shadow-none"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            className="shadow-none"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="shadow-none"
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <FancyButton type="submit" disabled={loading} className="px-5">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <>
                <FontAwesomeIcon icon={["fas", "sync-alt"]} className="me-2" />
                <span> Update</span>
              </>
            )}
          </FancyButton>
        </div>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
};
