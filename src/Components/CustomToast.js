import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function CustomToast(props) {
  const { show, toggle, message } = props;

  return (
    // <div
    //   aria-live="polite"
    //   aria-atomic="true"
    //   className="bg-dark position-relative"
    //   style={{ minHeight: "240px" }}
    // >
    <ToastContainer className="p-3 " position={"bottom-end"}>
      <Toast
        show={show}
        onClose={toggle}
        delay={3000}
        autohide
        className="bg-white"
      >
        <Toast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
           */}
          <FontAwesomeIcon className="rounded me-2" icon={["fas", "bell"]} />
          <strong className="me-auto">E-Prathibha</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
    // </div>
  );
}
