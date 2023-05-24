import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

const EventEditForm = () => {
  const [errors, setErrors] = useState({});

  const [eventData, setEventData] = useState({
    title: "",
    content: "",
    image: "",
    eventType: "",
    location: "",
    startAt: "",
    endAt: "",
    allDay: "No",
    privacy: 0,
  });
  const { title, content, image } = eventData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        const {
          title,
          content,
          image,
          is_owner,
          eventType,
          location,
          startAt,
          endAt,
          allDay,
          privacy,
        } = data;

        is_owner ? setEventData({ title, content, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  return <div>EventEditForm</div>;
};

export default EventEditForm;
