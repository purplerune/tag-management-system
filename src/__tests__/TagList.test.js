import { act, fireEvent, render, screen } from "@testing-library/react";
import TagList from "../components/TagList";

jest.mock("../services/api", () => {
  let sampleTags = [
    { id: 1, name: "Tag 1" },
    { id: 2, name: "Tag 2" },
    { id: 3, name: "Tag 3" },
  ];
  return {
    loadTags: async () => sampleTags,
    addTag: async (tagName) => ({ id: sampleTags.length + 1, name: tagName }),
  };
});

test("allows adding tags", async () => {
  render(<TagList />);

  const inputElement = screen.getByTestId("add-tag-input", {
    name: /add tag/i,
  });
  const addButton = screen.getByTestId("add-tag-button", { name: /add tag/i });
  fireEvent.change(inputElement, { target: { value: "New Tag" } });

  act(() => {
    fireEvent.click(addButton);
  });

  await screen.findByText("New Tag");
  expect(screen.getByText("New Tag")).toBeInTheDocument();
});
