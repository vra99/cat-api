import App from '../App';
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

const setup = () => {
  const { container } = render(<App/>);

  return { container };
};

describe("App", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toBeVisible();
  });

  it("should show Loading... if the app has not loaded the cat images", async () => {
    setup();
    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("should render a list of cat images when the app loads", async () => {
    setup();
    const cats = await waitFor(() =>screen.findAllByRole("img"));
    expect(cats).toBeDefined();
  });

});
