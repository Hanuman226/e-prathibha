import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../api/userThunk";
import CustomModal from "../../Components/CustomModal";

export default function ProfileModal(props) {
  const { show, toggle } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const { name, email } = useSelector((state) => state.user.profile);
  return (
    <CustomModal show={show} toggle={toggle} title={"Profile"}>
      <p className="text-dark">
        Name: <span className="fw-bold">{name}</span>
      </p>
      <p className="text-dark">
        Email: <span className="fw-bold">{email}</span>
      </p>
    </CustomModal>
  );
}
