import React, { useEffect, useState } from "react";
import EventCalendar from "./Calendar";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { PacmanLoader } from "react-spinners";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CalendarPage.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function CalendarPage() {
  useRedirect("loggedOut");
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/calendars/${currentUser.pk}/`
        );
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
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
      <Container className={styles.PacmanLoaderContainer}>
        {hasLoaded ? (
          <p></p>
        ) : (
          <p className={styles.PacmanLoader}>Your events are loading...</p>
        )}
        <div className={styles.PacmanLoader}>
          <PacmanLoader color="#21ca89" loading={!hasLoaded} />
        </div>
      </Container>
      <EventCalendar events={events.results} />
    </>
  );
}

export default CalendarPage;
