import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BasicModal = ({show, handleClose, modalHeading, modalBody, modalPrimary, primaryFn }) => {

  const handlePrimaryClick = () => {
    handleClose(); // Close the modal
    primaryFn(); // Call the primary function passed as a prop
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrimaryClick}>
          {modalPrimary}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasicModal;
