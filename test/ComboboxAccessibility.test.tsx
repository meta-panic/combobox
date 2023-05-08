import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import DemoPage from "../src/pages/demo/DemoPage";
import { setupTests } from "./Setup";

const { user, getByRoleAndText } = setupTests();

test("Combobox is focusable", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();

  expect(combobox).toHaveFocus();
});
test("Combobox down arrow opens popup ", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();

  expect(combobox).toHaveFocus();
  await user.keyboard("{ArrowDown}");
  expect(combobox).toHaveFocus();
  expect(screen.getByText("Apple")).toBeVisible();
});

test("Down arrow on combobox opens popup ", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();

  expect(combobox).toHaveFocus();
  await user.keyboard("{ArrowDown}");
  expect(combobox).toHaveFocus();
  expect(screen.getByText("Apple")).toBeVisible();
});
test("Escape when popup is open: closes popup, focus remains on combobox", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  expect(combobox).toHaveFocus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getByText("Apple")).toBeVisible();
  expect(combobox).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(screen.queryByText("Apple")).toBeNull();
  expect(combobox).toHaveFocus();
});
