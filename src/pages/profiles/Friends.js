import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Profile from "./Profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function Friends({ message, filter = "" }) {
  const [friends, setFriends] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

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
    setRefresh(false);
    setHasLoaded(false);
    fetchFriends();
  }, [filter, query, pathname, refresh]);

  return (
    <>
      {hasLoaded ? (
        <>
          {friends.results.length ? (
            <InfiniteScroll
              children={friends.results.map((friend) => (
                <Profile
                  key={friend.id}
                  {...friend}
                  profile={friend}
                  setRefresh={setRefresh}
                />
              ))}
              dataLength={friends.results.length}
              loader={<Asset spinner />}
              hasMore={!!friends.next}
              next={() => fetchMoreData(friends, setFriends)}
            />
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </>
  );
}

export default Friends;
