import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProducerForm from "./ProducerForm";
import { Provider } from "react-redux";
import store from "../../redux/store";

test("renders ProducerForm and submits data", () => {
  render(
    <Provider store={store}>
      <ProducerForm />
    </Provider>
  );

  const cpfCnpjInput = screen.getByLabelText(/CPF\/CNPJ/i);
  fireEvent.change(cpfCnpjInput, { target: { value: "12345678901" } });

  const producerNameInput = screen.getByLabelText(/Producer Name/i);
  fireEvent.change(producerNameInput, { target: { value: "Test Producer" } });

  const submitButton = screen.getByText(/Add Producer/i);
  fireEvent.click(submitButton);

  expect(store.getState().producers.producers).toHaveLength(3);
});
