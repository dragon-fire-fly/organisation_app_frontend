import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import EventsPage from "./pages/events/EventsPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventEditForm from "./pages/events/EventEditForm";
import ProfilePageEvents from "./pages/profiles/ProfilePageEvents";
import Friends from "./pages/profiles/Friends";
import PastEventsPage from "./pages/events/PastEventsPage";
import NotFound from "./pages/NotFound";
import EventPagePast from "./pages/events/EventPagePast";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search term or add a friend to see their posts!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/posts/create"
            render={() => <PostCreateForm />}
          />
          <Route
            exact
            path="/posts/:id/edit"
            render={() => <PostEditForm />}
          />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/events"
            render={() => <ProfilePageEvents />}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route
            exact
            path="/events"
            render={() => (
              <EventsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/events/past"
            render={() => (
              <PastEventsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/events/watched"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search term or watch an event!"
                filter={`watches__owner__profile=${profile_id}&ordering=-watches__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/events/friends"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search term or add a friend to see their events!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route
            exact
            path="/events/:id/past"
            render={() => <EventPagePast />}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EventEditForm />}
          />
          <Route exact path="/calendar" render={() => <CalendarPage />} />
          <Route
            exact
            path="/friends"
            render={() => (
              <Friends
                message="No friends found. Add friends to see them here!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route path="/notfound" render={() => <NotFound />} />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}
export default App;
