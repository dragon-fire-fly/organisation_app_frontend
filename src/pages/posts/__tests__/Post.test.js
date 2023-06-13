import { BrowserRouter as Router } from "react-router-dom";
import Post from "../Post";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("the post owners avatar renders", () => {
  render(
    <Router>
      <Post />
    </Router>
  );

  const postOwnerAvatar = screen.getByAltText("Avatar");
  expect(postOwnerAvatar).toBeInTheDocument();
});

describe("the post component renders", () => {
  const renderComponent = () =>
    render(
      <Router>
        <Post />
      </Router>
    );
  test("the post component renders", async () => {
    renderComponent();
    await act(async () => {
      expect(true).toEqual(true);
    });
  });
});
