import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

function EventCalendar(props) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "today prevYear,prev,next,nextYear",
        center: "title",
        end: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
      }}
      height={"90vh"}
      events={props.events}
    />
  );
}

export default EventCalendar;
