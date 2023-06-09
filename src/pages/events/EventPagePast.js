import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import MemoryCreateForm from "../memories/MemoryCreateForm";
import Event from "./Event";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Memory from "../memories/Memory";
import { fetchMoreData } from "../../utils/utils";
import UpcomingEvents from "./UpcomingEvents";
import SelectorSwitch from "../../components/SelectorSwitch";

function EventPagePast() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [memories, setMemories] = useState({ results: [] });
  const history = useHistory();

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
        if (err.response?.status === 404 || err.response?.status === 400) {
          history.push("/notfound");
        }
      }
    };
    setHasLoaded(false);
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <UpcomingEvents events={[]} mobile />
        <UpcomingEvents events={[]} />
      </Col>
      {hasLoaded ? (
        <>
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <Event {...event.results[0]} setEvents={setEvent} eventPage />
            <Container className={appStyles.Content}>
              <SelectorSwitch
                left="Plans"
                right="Memories"
                linkLeft={true}
                linkto={`/events/${id}`}
              />
              {currentUser ? (
                <MemoryCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  event={id}
                  setEvent={setEvent}
                  setMemories={setMemories}
                  past={event.results[0].past}
                />
              ) : memories.results.length ? (
                "Memories"
              ) : null}
              {memories.results.length ? (
                <InfiniteScroll
                  children={memories.results
                    .filter((memory) => !memory.plan)
                    .map((memory) => (
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
                event.results[0].past ? (
                  <span>No memories yet, be the first to add one!</span>
                ) : (
                  <span>
                    No memories yet.. we hope it'll be a great event!
                  </span>
                )
              ) : event.results[0].past ? (
                <span>No memories... yet</span>
              ) : (
                <span>No memories... check back after the event!</span>
              )}
            </Container>
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

export default EventPagePast;
