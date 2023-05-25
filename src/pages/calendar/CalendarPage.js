import React, { useEffect, useState } from "react";
import EventCalendar from "./Calendar";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import { PacmanLoader } from "react-spinners";

function CalendarPage() {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events`);
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
  }, []);

  return (
    <>
      <Container>
        {hasLoaded ? <p></p> : <p>Your events are loading...</p>}
        <PacmanLoader
          color="blue"
          loading={!hasLoaded}
          cssOverride={override}
        />
      </Container>
      <EventCalendar events={events.results} />
    </>
  );
}

export default CalendarPage;
