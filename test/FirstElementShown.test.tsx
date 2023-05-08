import { getByPlaceholderText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import userEvent from "@testing-library/user-event";
import  DemoPage  from "../src/pages/demo/DemoPage";

const user = userEvent.setup();

function getByRoleAndText(role: string, text: string) {
  return screen.getAllByRole(role).find((e) => e.textContent?.includes(text));
}

test("Loads and displays placeholder", async () => {
  render(<DemoPage />);
  expect(screen.getByPlaceholderText("Choose a Fruit:")).toBeVisible();
});

test("Displays items after click on input ", async () => {
  render(<DemoPage />);

  await user.click(screen.getByPlaceholderText("Choose a Fruit:"));
  expect(getByRoleAndText("option", "Apple")).toBeVisible();
  expect(getByRoleAndText("option", "Banana")).toBeVisible();
  expect(getByRoleAndText("option", "Pear")).toBeVisible();
  expect(getByRoleAndText("option", "Pineapple")).toBeVisible();
  expect(getByRoleAndText("option", "Mango")).toBeVisible();
});

test("Does not display items after click on item ", async () => {
  render(<DemoPage />);
  await user.click(screen.getByPlaceholderText("Choose a Fruit:"));
  expect(getByRoleAndText("option", "Apple")).toBeVisible();
  await user.click(screen.getByText("Apple"));
  expect(screen.queryByText("Apple")).toBeNull();
  expect(screen.queryByText("Banana")).toBeNull();
  expect(screen.queryByText("Pear")).toBeNull();
  expect(screen.queryByText("Pineapple")).toBeNull();
  expect(screen.queryByText("Mango")).toBeNull();
});

test("Selects item after click on item ", async () => {
  render(<DemoPage />);
  await user.click(screen.getByPlaceholderText("Choose a Fruit:"));
  expect(getByRoleAndText("option", "Apple")).toBeVisible();
  await user.click(screen.getByText("Apple"));

  expect(screen.getByPlaceholderText("Choose a Fruit:")).toHaveDisplayValue("Apple");

});