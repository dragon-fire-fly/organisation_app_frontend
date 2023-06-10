import React from "react";
import { Link } from "react-router-dom";
import EventImage from "./EventImage";
import dateFormat from "dateformat";

const EventMini = (props) => {
  const { event, mobile, imageSize = 55 } = props;
  const { id, title, image, start } = event;

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
        {dateFormat(start, "mmmm dS")}
      </div>
    </div>
  );
};
export default EventMini;
