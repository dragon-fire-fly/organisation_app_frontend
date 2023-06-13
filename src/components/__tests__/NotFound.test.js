import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../../pages/NotFound";

test("NotFound page renders", () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );

  const notFound = screen.getByText("Sorry, that page couldn't be found!");
  expect(notFound).toBeInTheDocument();
});
