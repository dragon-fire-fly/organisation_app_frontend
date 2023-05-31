import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import EventImage from "../../components/EventImage";
import dateFormat from "dateformat";

const EventMini = (props) => {
  const { event, mobile, imageSize = 55, setRefresh } = props;
  const { id, owner, title, image, location, start, end } = event;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  console.log(dateFormat(event.start, "mmmm dS, yyyy"));

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/events/${id}`}>
          <EventImage src={image} height={imageSize} />
        </Link>
      </div>
      <div className={"mx-3"}>
        <Link className="align-self-center" to={`/events/${id}`}>
          <strong>{title}</strong>
        </Link>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {dateFormat(start, "mmmm dS yyyy")}
      </div>
    </div>
  );
};
export default EventMini;
