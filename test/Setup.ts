import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

export function getByRoleAndText(role: string, text: string) {
  return screen.getAllByRole(role).find((e) => e.textContent?.includes(text));
}

export const user = userEvent.setup();
export function setupPolyfills() {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

}
