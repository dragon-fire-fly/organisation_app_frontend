import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Container } from "react-bootstrap";
import Event from "../events/Event";
import { useUpcomingEventsData } from "../../contexts/UpcomingEventsContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const UpcomingEvents = ({ events, mobile }) => {
  const currentUser = useCurrentUser();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/calendars/${currentUser.pk}`
        );
        setUpcomingEvents(data.results);
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
  }, [events]);

  console.log(upcomingEvents);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {hasLoaded ? (
        upcomingEvents?.length ? (
          <>
            <p>Your Upcoming Events</p>
            {upcomingEvents.map((event) => (
              <p>
                {event.title} {event.start}
              </p>
            ))}
          </>
        ) : (
          <>
            <p>Your Upcoming Events</p>
            <p>You have no upcoming events.</p>
            <p>
              Create an event or add someone else's event to your calendar to
              get started!
            </p>
          </>
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};
export default UpcomingEvents;
