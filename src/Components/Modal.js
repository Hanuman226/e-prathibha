import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FancyButton from "./FancyButton";
 export default function CustomModal(props) {
   const {children,title,show,toggle,link}=props;
  return (
      <Modal show={show} onHide={toggle}   backdrop="static"
      keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Link to={link}>
          <FancyButton onClick={toggle} >
           start now
          </FancyButton>
          </Link>
        </Modal.Footer>
      </Modal>
  );
}