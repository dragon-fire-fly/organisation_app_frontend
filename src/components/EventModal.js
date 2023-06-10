import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EventMini from "./EventMini";
import btnStyles from "../styles/Button.module.css";

const EventModal = (props) => {
  const { show, setShow, handleClose, header, body, specificEvent } = props;
  const [eventId, setEventId] = useState("");

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
    <Modal show={show} onHide={() => setShow(false)}>
      {/* <Modal show={show}> */}
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        {specificEvent ? (
          <>
            <EventMini event={body[0][0]} />
          </>
        ) : body[0]?.length ? (
          body[0].map((event) => (
            <>
              <EventMini event={event} />
            </>
          ))
        ) : (
          <p>No events scheduled today</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>cancel</Button>

        {specificEvent ? (
          <Button
            onClick={viewEventRedirect}
            className={btnStyles.SelectorBtn}
          >
            view event
          </Button>
        ) : (
          <Button onClick={addEventRedirect} className={btnStyles.SelectorBtn}>
            add event
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
