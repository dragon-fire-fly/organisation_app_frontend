import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EventModal = (props) => {
  // console.log(props);
  const { show, setShow, handleClose, header, body, specificEvent } = props;
  const [eventId, setEventId] = useState("");
  let eventLink = `/events/${eventId}`;

  useEffect(() => {
    const fetchEvent = () => {
      try {
        setEventId(body[0][0].id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, [body]);
  const history = useHistory();

  const addEventRedirect = () => history.push("/events/create");
  const viewEventRedirect = () => history.push(`/events/${eventId}`);

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
              <Link to={`/events/${eventId}`}>{event.title}</Link>
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
          <Button onClick={viewEventRedirect}>view event</Button>
        ) : (
          <Button onClick={addEventRedirect}>add event</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
