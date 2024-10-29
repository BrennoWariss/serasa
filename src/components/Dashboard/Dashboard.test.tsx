import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import store from "../../redux/store";

test("renders Dashboard with correct total farms and area", () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  const totalFarmsText = screen.getByText(/Total Farms: 2/i);
  expect(totalFarmsText).toBeInTheDocument();

  const totalAreaText = screen.getByText(/Total Farm Area: 800 ha/i);
  expect(totalAreaText).toBeInTheDocument();
});
