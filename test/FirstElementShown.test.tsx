import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

function getByRoleAndText(role: string, text: string) {
  return screen.getAllByRole(role).find((e) => e.textContent?.includes(text));
}

test("Loads and displays placeholder", async () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Choose a Fruit:")).toBeVisible();
});

test("Displays items after click on input ", async () => {
  render(<App />);
  screen.getByPlaceholderText("Choose a Fruit:").click();
  expect(getByRoleAndText("button", "Apple")).toBeVisible();
  expect(getByRoleAndText("button", "Banana")).toBeVisible();
  expect(getByRoleAndText("button", "Pear")).toBeVisible();
  expect(getByRoleAndText("button", "Pineapple")).toBeVisible();
  expect(getByRoleAndText("button", "Mango")).toBeVisible();
});

test("Does not display items after click on item ", async () => {
  render(<App />);
  screen.getByPlaceholderText("Choose a Fruit:").click();
  screen.getByText("Apple").click();
  expect(screen.getByText("Apple")).toBeNull();
  expect(screen.getByText("Banana")).toBeNull();
  expect(screen.getByText("Pear")).toBeNull();
  expect(screen.getByText("Pineapple")).toBeNull();
  expect(screen.getByText("Mango")).toBeNull();
});
