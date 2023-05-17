import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import styles from "../../styles/EventsPage.module.css";

function EventsPage() {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  // to detect url changes
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  return (
    <>
      <Row className="h-100">
        <h1>Events Page</h1>
      </Row>
      <Row></Row>
    </>
  );
}

export default EventsPage;
