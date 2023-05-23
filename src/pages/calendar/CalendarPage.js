import React, { useEffect, useState } from "react";
import EventCalendar from "../../components/Calendar";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function CalendarPage(filter = "") {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/calendar`
          // `/events/?${filter}search=${query}`
        );
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  console.log(events?.results);

  const testEvents = [
    {
      title: "event 1",
      start: "2023-05-01 17:00:00",
      end: "2023-05-03 19:00:00",
    },
    { title: "event 2", date: "2023-05-18" },
  ];
  return <EventCalendar events={events?.results} />;
}

export default CalendarPage;
