import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import Event from "./Event";
import { fetchMoreData } from "../../utils/utils";
import UpcomingEvents from "./UpcomingEvents";
import SelectorSwitch from "../../components/SelectorSwitch";

function EventsPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  // to detect url changes
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${query}`
        );
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <UpcomingEvents
          events={events.results.filter((event) => event["past"] === false)}
        />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <UpcomingEvents
          events={events.results.filter((event) => event["past"] === false)}
          mobile
        />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search Events"
          />
        </Form>
        <SelectorSwitch
          left="Upcoming events"
          right="Past Events"
          linkLeft={false}
          linkto="/events/past"
        />
        {hasLoaded ? (
          <>
            {events.results.length ? (
              <InfiniteScroll
                children={events.results
                  .filter((event) => event["past"] === false)
                  .map((event) => (
                    <Event key={event.id} {...event} setEvents={setEvents} />
                  ))}
                dataLength={events.results.length}
                loader={<Asset spinner />}
                hasMore={!!events.next}
                next={() => fetchMoreData(events, setEvents)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default EventsPage;
