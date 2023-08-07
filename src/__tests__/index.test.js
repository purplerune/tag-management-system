import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home Page", () => {
  test("renders Tag Management System heading", () => {
    render(<Home />);
    const headingElement = screen.getByText(/Tag Management System/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders TagList component", () => {
    render(<Home />);
    const tagListElement = screen.getByTestId("tag-list");
    expect(tagListElement).toBeInTheDocument();
  });
});
