import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import styles from "../../styles/UpcomingEvents.module.css";
import { Container, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EventMini from "./EventMini";

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

    fetchEvents();
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
            <p className={styles.Title}>Your Upcoming Events</p>
            <div>
              {upcomingEvents.map((event) => (
                <EventMini event={event} imageSize={75} />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className={styles.Title}>Your Upcoming Events</p>
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
