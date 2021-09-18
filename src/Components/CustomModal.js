import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FancyButton } from "./StyledComponents";
export default function CustomModal(props) {
  const {
    children,
    title,
    show,
    toggle,
    link,
    size,
    onExit,
    backdrop,
    keyboard,
  } = props;
  return (
    <Modal
      show={show}
      onHide={toggle}
      size={size}
      onExit={onExit}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        {link && (
          <FancyButton as={Link} to={link} onClick={toggle}>
            start now
          </FancyButton>
        )}
      </Modal.Footer>
    </Modal>
  );
}
