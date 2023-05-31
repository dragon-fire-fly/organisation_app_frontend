import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function Friends({ message, filter = "" }) {
  const [friends, setFriends] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?${filter}search=${query}`
        );
        setFriends(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchFriends();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <>
      <Row className="h-100">Friends</Row>
      {friends.results.length ? (
        <InfiniteScroll
          children={friends.results.map((friend) => (
            <Profile key={friend.id} {...friend} profile={friend} />
          ))}
          dataLength={friends.results.length}
          loader={<Asset spinner />}
          hasMore={!!friends.next}
          next={() => fetchMoreData(friends, setFriends)}
        />
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </>
  );
}

export default Friends;
