import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props) {
  const { handleCloseModal, deleteEmployee, deleteModal } = props

  return (
    <Modal
      show={deleteModal}
      onHide={handleCloseModal}
    >
      <Modal.Body>
        Are you sure you want to delete?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="danger" onClick={deleteEmployee}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}