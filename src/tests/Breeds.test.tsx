import { Breeds } from "../components/Breeds";
import { screen, render, fireEvent } from "@testing-library/react";

const baseProps = {
  handleSearchByBreed: jest.fn(),
  setError: jest.fn(),
};

const setup = () => {
  const { container } = render(<Breeds {...baseProps} />);
  return { container };
};

describe("Breeds", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toBeVisible();
  });
  it("should render a list of breeds", async () => {
    setup();
    const breeds = await screen.findAllByRole("button");
    expect(breeds).toBeDefined();
    expect(await screen.findByText("Abyssinian")).toBeVisible();
  });

  it("should call handleSearchByBreed when a breed is clicked", async () => {
    setup();
    const button = await screen.findByRole("button", { name: "Abyssinian" });
    fireEvent.click(button);
    expect(baseProps.handleSearchByBreed).toHaveBeenCalled();
  });
});
