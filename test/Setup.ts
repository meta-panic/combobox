import userEvent from "@testing-library/user-event/index";
import { screen } from "@testing-library/react";

function getByRoleAndText(role: string, text: string) {
  return screen.getAllByRole(role).find((e) => e.textContent?.includes(text));
}

export function setupTests() {
  const user = userEvent.setup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  return {
    user,
    getByRoleAndText,
  };
}
