import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const EventModal = (props) => {
  // console.log(props);
  const { show, setShow, handleClose, header, body, specificEvent } = props;

  console.log(specificEvent);

  const addEventRedirect = () => console.log("button pressed");

  return (
    // <Modal show={show} onHide={() => setShow(false)}>
    <Modal show={show}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        {specificEvent ? (
          <>
            <p key={body[0][0].title}>{body[0][0].title}</p>
            <p key={body[0][0].id}>
              from {body[0][0].start} 'til {body[0][0].end}
            </p>
          </>
        ) : body[0]?.length ? (
          body[0].map((event) => (
            <>
              <Link
                // to={{ pathname: "/events", state: { event } }}
                key={event.title}
              >
                {event.title}
              </Link>
              <p key={event.id}>
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

        {specificEvent ? (
          <Button>view event</Button>
        ) : (
          <Button onClick={addEventRedirect}>add event</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
