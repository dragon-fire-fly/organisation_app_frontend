import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";

function EventCalendar(props) {
  const [show, setShow] = useState(false);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [calendarEvents, setCalendarEvents] = useState({ events: [] });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateClick = (arg) => {
    // bind with an arrow function
    // console.log(`you clicked on ${arg.dateStr}`);
    setHeader(`Events for ${arg.dateStr}`);
    let dayEvents = [];
    for (let x in props.events) {
      if (
        arg.dateStr + 1 >= props.events[x].start &&
        arg.dateStr <= props.events[x].end
      ) {
        // console.log(`${props.events[x].title} today!`);
        const eventDetails = {};
        eventDetails["title"] = props.events[x].title;
        eventDetails["start"] = props.events[x].start;
        eventDetails["end"] = props.events[x].end;
        dayEvents.push(eventDetails);
      }
    }

    setBody([dayEvents]);
    setShow(true);
  };

  const handleEventClick = (arg) => {
    console.log(arg.event.title);
    setHeader(arg.event.title);
    setShow(true);
  };

  const renderModalContent = () => {
    let modalContent = "";
    for (let x in calendarEvents) {
      modalContent += calendarEvents["events"][x].title;
    }
    return modalContent;
  };

  return (
    <>
      <EventModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        header={header}
        body={body}
      />

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
