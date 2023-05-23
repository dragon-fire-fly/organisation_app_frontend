import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

export default class EventCalendar extends React.Component {
  render(props) {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={[
          { title: "event 1", date: "2023-05-01" },
          { title: "event 2", date: "2023-05-18" },
        ]}
      />
    );
  }
}
