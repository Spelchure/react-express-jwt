import { render, RenderOptions, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

export const renderWithRedux = (
  ui: React.ReactElement,
  renderOptions?: RenderOptions
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe("Application healty checks.", () => {
  test("renders h1 component.", () => {
    renderWithRedux(<App />);
    const myElement = screen.getByText(/Hello World/i);
    expect(myElement).toBeInTheDocument();
  });
});
