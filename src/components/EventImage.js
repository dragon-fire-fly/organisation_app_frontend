import React from "react";
import styles from "../styles/EventImage.module.css";

const EventImage = ({ src, height = 45, text }) => {
  return (
    <>
      <img
        className={styles.EventImg}
        src={src}
        height={height}
        width={height}
        alt="Event Image"
      />
      {text}
    </>
  );
};

export default EventImage;
