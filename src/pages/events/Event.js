import React from "react";
import styles from "../../styles/Event.module.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    event_type,
    location,
    start_at,
    end_at,
    // all_day,
    privacy,
    memories_count,
    watches_count,
    watch_id,
    eventPage,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();

  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleWatch = async () => {
    try {
      const { data } = await axiosRes.post("/watches/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                watches_count: event.watches_count + 1,
                watch_id: data.id,
              }
            : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnwatch = async () => {
    try {
      await axiosRes.delete(`/watches/${watch_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                watches_count: event.watches_count - 1,
                watch_id: null,
              }
            : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCalendar = async () => {
    try {
      // retrieve the calendar, then add the event (appended to a list), THEN post

      const { data } = await axiosRes.get(`/events/${id}/`);
      data.calendars.push(currentUser.pk);

      console.log(data.calendars);
      await axiosRes.patch(`/events/${id}/`, {
        calendars: data.calendars,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromCalendar = () => {
    console.log("button pressed");
  };

  return (
    <Card>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {/* <span>{updated_at}</span> */}
            {is_owner && eventPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {event_type && <Card.Text>{event_type}</Card.Text>}
        {start_at && (
          <Card.Text>
            {start_at} - {end_at}
          </Card.Text>
        )}
        {location && <Card.Text>{location}</Card.Text>}

        <div className={styles.EventBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't watch your own Event!</Tooltip>}
            >
              <i className="fa-regular fa-eye" />
            </OverlayTrigger>
          ) : watch_id ? (
            <span onClick={handleUnwatch}>
              <i className={`fa-solid fa-eye ${styles.Eyes}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleWatch}>
              <i className={`fa-regular fa-eye ${styles.EyesOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to watch events!</Tooltip>}
            >
              <i className="fa-regular fa-eye" />
            </OverlayTrigger>
          )}
          {watches_count}
          <Link to={`/events/${id}`}>
            <i className="fa-solid fa-brain" />
          </Link>
          {memories_count}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Your event is already in your calendar!</Tooltip>
              }
            >
              <i className="fa-regular fa-calendar-check" />
            </OverlayTrigger>
          ) : // watch_id needs to be updated to in_calendar
          watch_id ? (
            <span onClick={handleAddToCalendar}>
              <i className={`fa-solid fa-calendar-check ${styles.Eyes}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleRemoveFromCalendar}>
              <i
                className={`fa-regular fa-calendar-check ${styles.EyesOutline}`}
              />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Log in to add events to your calendar!</Tooltip>
              }
            >
              <i className="fa-regular fa-calendar-check" />
            </OverlayTrigger>
          )}
          add to calendar
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;
