import { BrowserRouter as Router } from "react-router-dom";
import Post from "../Post";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("post owner avatar renders", () => {
  render(
    <Router>
      <Post />
    </Router>
  );

  const postOwnerAvatar = screen.getByAltText("Avatar");
  expect(postOwnerAvatar).toBeInTheDocument();
});

describe("renders post component", () => {
  const renderComponent = () =>
    render(
      <Router>
        <Post />
      </Router>
    );
  test("renders the post component", async () => {
    renderComponent();
    await act(async () => {
      expect(true).toEqual(true);
    });
  });
});
