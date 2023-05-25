import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PopularProfiles from "../profiles/PopularProfiles";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import MemoryCreateForm from "../memories/MemoryCreateForm";
import Event from "./Event";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Memory from "../memories/Memory";
import { fetchMoreData } from "../../utils/utils";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [memories, setMemories] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }, { data: memories }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/memories/?event=${id}`),
        ]);
        setEvent({ results: [event] });
        setMemories(memories);
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
            <Container className={appStyles.Content}>
              {currentUser ? (
                <MemoryCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  event={id}
                  setEvent={setEvent}
                  setMemories={setMemories}
                />
              ) : memories.results.length ? (
                "Memories"
              ) : null}
              {memories.results.length ? (
                <InfiniteScroll
                  children={memories.results.map((memory) => (
                    <Memory
                      key={memory.id}
                      {...memory}
                      setEvent={setEvent}
                      setMemories={setMemories}
                    />
                  ))}
                  dataLength={memories.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!memories.next}
                  next={() => fetchMoreData(memories, setMemories)}
                />
              ) : currentUser ? (
                <span>No memories yet, be the first to add one!</span>
              ) : (
                <span>No memories... yet</span>
              )}
            </Container>
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
