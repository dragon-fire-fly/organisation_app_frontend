import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PopularProfiles from "../profiles/PopularProfiles";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentCreateForm from "../comments/CommentCreateForm";
import Event from "./Event";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      {hasLoaded ? (
        <>
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <PopularProfiles mobile />
            <Event {...event.results[0]} setEvents={setEvent} eventPage />
            <Container className={appStyles.Content}>Memories</Container>
          </Col>
          <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
            <PopularProfiles />
          </Col>
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Row>
  );
}

export default EventPage;
