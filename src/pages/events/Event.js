import React, { useState } from "react";
import styles from "../../styles/Event.module.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import dateFormat from "dateformat";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

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
    start,
    end,
    link,
    memories_count,
    watches_count,
    watch_id,
    calendars,
    eventPage,
    setEvents,
    past,
  } = props;

  const currentUser = useCurrentUser();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleShow = () => {
    setShow(true);
    setMessage(`Are you sure you want to delete your event "${title}"?`);
  };

  const handleClose = () => setShow(false);

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
      // retrieve the calendar, then add the event (appended to a list), THEN patch

      const { data } = await axiosRes.get(`/events/${id}/`);
      data.calendars.push(currentUser.pk);
      await axiosRes.patch(`/events/${id}/`, {
        calendars: data.calendars,
      });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                calendars: data.calendars,
              }
            : event;
        }),
      }));
      console.log("added to calendar");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromCalendar = async () => {
    try {
      // retrieve the calendar, then remove the event, THEN patch

      const { data } = await axiosRes.get(`/events/${id}/`);

      const userIndex = data.calendars.indexOf(currentUser.pk);
      data.calendars.splice(userIndex, 1);
      await axiosRes.patch(`/events/${id}/`, {
        calendars: data.calendars,
      });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                calendars: data.calendars,
              }
            : event;
        }),
      }));
      console.log("removed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
                  handleShow={handleShow}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        {past ? (
          <Link to={`/events/${id}/past/`}>
            <Card.Img src={image} alt={title} />
          </Link>
        ) : (
          <Link to={`/events/${id}/`}>
            <Card.Img src={image} alt={title} />
          </Link>
        )}
        <Card.Body className="text-center">
          {title && (
            <Card.Title className={`text-center ${styles.bold}`}>
              {title}
            </Card.Title>
          )}
          {content && <Card.Text>{content}</Card.Text>}
          {event_type && (
            <Card.Text>
              <u>
                <strong>Event type: </strong>
              </u>
              {event_type}
            </Card.Text>
          )}
          {start && (
            <Card.Text>
              <u>
                <strong>When: </strong>
              </u>
              {dateFormat(start, "mmmm dS 'yy HH:MM")}-
              {dateFormat(end, "mmmm dS 'yy HH:MM")}
            </Card.Text>
          )}
          {location && (
            <Card.Text>
              <u>
                <strong>Where: </strong>
              </u>
              {location}
            </Card.Text>
          )}
          {link && (
            <Card.Text>
              <a href={link}>
                <u>
                  <strong>More info here</strong>
                </u>
              </a>
            </Card.Text>
          )}

          <div className={styles.EventBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>You can&#39;t watch your own Event!</Tooltip>
                }
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
                  <Tooltip>
                    You cannot remove your own event from your calendar!
                  </Tooltip>
                }
              >
                <i className={`fa-solid fa-calendar-check ${styles.Eyes}`} />
              </OverlayTrigger>
            ) : calendars.includes(currentUser?.pk) ? (
              <span onClick={handleRemoveFromCalendar}>
                <i className={`fa-solid fa-calendar-check ${styles.Eyes}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleAddToCalendar}>
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
      <DeleteConfirmModal
        showModal={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
        message={message}
      />
    </>
  );
};

export default Event;
