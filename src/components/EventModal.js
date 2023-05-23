import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EventModal = (props) => {
  // console.log(props);
  const { show, setShow, handleClose, header, body } = props;

  return (
    // <Modal show={show} onHide={() => setShow(false)}>
    <Modal show={show}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        {body[0].length ? (
          body[0].map((event) => (
            <>
              <p key={event.title}>{event.title}</p>
              <p>
                from {event.start} 'til {event.end}
              </p>
            </>
          ))
        ) : (
          <p>No events scheduled today</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>cancel</Button>

        <Button>submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
