import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByAltText("Avatar");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders link to the events page", async () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const events = await screen.findByText("Events");
  expect(events).toBeInTheDocument();
});

test("renders link to the posts page", async () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const posts = await screen.findByText("Feed");
  expect(posts).toBeInTheDocument();
});

test("renders link to the calendar for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const calendar = await screen.findByText("Calendar");
  expect(calendar).toBeInTheDocument();
});

test("renders link to the add post page for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const post = await screen.findByText("Post");
  expect(post).toBeInTheDocument();
});

test("renders link to the add event page for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const event = await screen.findByText("Event");
  expect(event).toBeInTheDocument();
});
