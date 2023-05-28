import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../../components/EventModal";

function EventCalendar(props) {
  const events = props.events;
  const [show, setShow] = useState(false);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [specificEvent, setSpecificEvent] = useState(false);
  // const [calendarEvents, setCalendarEvents] = useState({ events: [] });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateClick = (arg) => {
    // bind with an arrow function
    // console.log(`you clicked on ${arg.dateStr}`);
    setHeader(`Events for ${arg.dateStr}`);
    setSpecificEvent(false);
    let dayEvents = [];
    for (let x in props.events) {
      if (
        arg.dateStr + 1 >= props.events[x].start &&
        arg.dateStr <= props.events[x].end
      ) {
        // console.log(`${props.events[x].title} today!`);
        const eventDetails = {};
        eventDetails["id"] = props.events[x].id;
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
    setHeader(arg.event.title);
    console.log(arg.event.id);
    let dayEvents = [];
    for (let x in props.events) {
      if (arg.event.id == props.events[x].id) {
        // console.log(`${props.events[x].title} today!`);
        const eventDetails = {};
        eventDetails["id"] = props.events[x].id;
        eventDetails["title"] = props.events[x].title;
        eventDetails["start"] = props.events[x].start;
        eventDetails["end"] = props.events[x].end;
        console.log(eventDetails);
        dayEvents.push(eventDetails);
      }
    }
    setBody([dayEvents]);
    setSpecificEvent(true);
    setShow(true);
    return () => {
      setSpecificEvent(false);
    };
  };

  return (
    <>
      <EventModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        header={header}
        body={body}
        specificEvent={specificEvent}
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