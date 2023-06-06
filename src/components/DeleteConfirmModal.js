import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import btnStyles from "../styles/Button.module.css";

const DeleteConfirmModal = (props) => {
  const { showModal, handleClose, handleDelete, message } = props;

  return (
    <Modal show={showModal} onHide={handleClose}>
      <ModalHeader>
        <ModalTitle>Are you sure..?</ModalTitle>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} className={btnStyles.DeleteBtn}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmModal;
