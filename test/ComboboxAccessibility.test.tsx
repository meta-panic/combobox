import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

import ComboBox from "../src/components/ComboBox/ComboBox";
import { FRUIT_LIST } from "../src/pages/demo/consts";
import userEvent from "@testing-library/user-event";

const testData = {
  searchPlaceholder: "Choose a fruit",
  entityType: "Fruits",
  items: FRUIT_LIST,
};
test("Combobox is focusable", async () => {
  render(<ComboBox {...testData} />);
  const combobox = screen.getByRole("combobox");

  const user = userEvent.setup();

  await user.tab();

  expect(combobox).toHaveFocus();
});