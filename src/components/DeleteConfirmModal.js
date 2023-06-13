import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
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
