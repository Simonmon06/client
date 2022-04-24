import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState } from "react";
const OrderModal = ({ session, orderedBy }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Show Payment Information
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header >
        <Modal.Title>Payment Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>Payment intent: {session.payment_intent}</Modal.Body>
      <Modal.Body>Payment status: {session.payment_status}</Modal.Body>
      <Modal.Body>
        Amount total: {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </Modal.Body>
      <Modal.Body>Stripe customer id: {session.customer}</Modal.Body>
      <Modal.Body>Customer: {orderedBy.name}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  </>


  );
};

export default OrderModal;
