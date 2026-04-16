import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RegisterPage } from "./register-page";

// Mock RegisterForm to avoid complexity in page test
jest.mock("@/features/auth/components/register-form", () => ({
  RegisterForm: () => <div data-testid="register-form">Register Form Mock</div>,
}));

describe("RegisterPage", () => {
  it("renders the register page layout correctly", () => {
    render(<RegisterPage />);

    // Check for main headings and sections
    expect(screen.getByText("Lista de compras")).toBeInTheDocument();
    expect(screen.getByText(/Junte-se ao círculo selecionado/i)).toBeInTheDocument();
    expect(screen.getByText("Lista de compras inteligente")).toBeInTheDocument();
    expect(screen.getByText("Receitas selecionadas")).toBeInTheDocument();
    
    // Check for the form presence
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  it("renders the identity logo for mobile view", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Shopping List")).toBeInTheDocument();
  });
});
