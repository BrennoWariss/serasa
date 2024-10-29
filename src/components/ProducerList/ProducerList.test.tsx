import React from "react";
import { render, screen } from "@testing-library/react";
import ProducerList from "./ProducerList";
import { Provider } from "react-redux";
import store from "../../redux/store";

test("renders ProducerList with initial data", () => {
  render(
    <Provider store={store}>
      <ProducerList />
    </Provider>
  );

  const producerName = screen.getByText(/João Silva/i);
  expect(producerName).toBeInTheDocument();
});
