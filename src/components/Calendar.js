import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";

function EventCalendar(props) {
  const [show, setShow] = useState(false);
  const [header, setHeader] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateClick = (arg) => {
    // bind with an arrow function
    // alert(arg.dateStr);
    console.log({ arg });
    console.log(`you clicked on ${arg.dateStr}`);
    setHeader("Add new Event");
    setShow(true);
  };

  const handleEventClick = (arg) => {
    console.log(arg.event.title);
    setHeader(arg.event.title);
    setShow(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>{header}</Modal.Header>
        <ModalBody>Event details</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>cancel</Button>
          <Button>submit</Button>
        </ModalFooter>
      </Modal>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          multiMonthPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prevYear,prev,next,nextYear",
          center: "title",
          end: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={props.events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </>
  );
}

export default EventCalendar;
