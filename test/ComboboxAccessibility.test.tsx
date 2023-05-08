import {  render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import  DemoPage  from "../src/pages/demo/DemoPage";
import { setupPolyfills, user, getByRoleAndText } from "./Setup";

setupPolyfills();

test("Combobox default roles and relationships", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");
  const listbox = screen.getByRole("listbox");

  expect(combobox).toHaveAttribute("aria-controls", listbox?.id);
  expect(combobox).toHaveAttribute("aria-autocomplete", "list");
  expect(combobox).toHaveAttribute("aria-expanded", "false");
  expect(listbox).toHaveAccessibleName("Fruits");

});
test("Combobox opens when focused", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();

  expect(combobox).toHaveFocus();
  expect(combobox).toHaveAttribute("aria-expanded", "true");
});

test("Escape when popup is open: closes popup, focus remains on combobox", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  expect(combobox).toHaveFocus();
  expect(combobox).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("{Escape}");
  expect(combobox).toHaveAttribute("aria-expanded", "false");
  expect(combobox).toHaveFocus();

});
test("Escape clears input field", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  expect(combobox).toHaveFocus();
  expect(combobox).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("app");
  expect(screen.getByPlaceholderText("Choose a Fruit:")).toHaveDisplayValue("app");
  await user.keyboard("{Escape}");
  expect(screen.getByPlaceholderText("Choose a Fruit:")).toHaveDisplayValue("");
  expect(combobox).toHaveAttribute("aria-expanded", "false");

});
test("Combobox down arrow opens popup if it is closed ", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  await user.keyboard("{Escape}");

  await user.keyboard("{ArrowDown}");
  expect(combobox).toHaveFocus();
  expect(combobox).toHaveAttribute("aria-expanded", "true");

});

test("Down arrow and up arrow on combobox listbox popup changes aria-activedescendant attribute", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  expect(combobox).toHaveAttribute("aria-expanded", "true");

  const options = screen.getAllByRole("option");

  expect(combobox).toHaveAttribute("aria-activedescendant", options[0]?.id );

  await user.keyboard("{ArrowDown}");

  expect(combobox).toHaveAttribute("aria-activedescendant", options[1]?.id );

  await user.keyboard("{ArrowUp}");

  expect(combobox).toHaveAttribute("aria-activedescendant", options[0]?.id );
});

test("Enter on option accepts value and closes popup", async () => {
  render(<DemoPage />);
  const combobox = screen.getByRole("combobox");

  await user.tab();
  expect(combobox).toHaveAttribute("aria-expanded", "true");

  await user.keyboard("{Enter}");
  expect(getByRoleAndText("option","Apple")).toHaveAttribute("aria-selected", "true");
  expect(combobox).toHaveDisplayValue("Apple");
  expect(combobox).toHaveAttribute("aria-expanded", "false");


});