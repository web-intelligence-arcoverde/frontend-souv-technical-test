import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";

// Mock the LoginForm component since we'll test it separately
jest.mock("@/features/auth/components/login-form", () => ({
  LoginForm: () => <div data-testid="login-form">Login Form Mock</div>,
}));

describe("LoginPage", () => {
  it("renders correctly with background and form", () => {
    render(<LoginPage />);

    // Check if the mock form is present
    expect(screen.getByTestId("login-form")).toBeInTheDocument();

    // Check for the restaurant_menu icon (the logo)
    expect(screen.getByText("restaurant_menu")).toBeInTheDocument();

    // Check for the footer
    expect(screen.getByText(/Web Intelligence - Arcoverde/i)).toBeInTheDocument();
  });

  it("handles the year in footer correctly", () => {
    const currentYear = new Date().getFullYear().toString();
    render(<LoginPage />);
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
