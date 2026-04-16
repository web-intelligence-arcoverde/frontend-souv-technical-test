import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./login-form";
import { useLogin } from "../hooks/use-login";

// Mock the hook
jest.mock("../hooks/use-login");

// Mock SocialAuthGroup
jest.mock("./social-auth-group", () => ({
  SocialAuthGroup: () => <div data-testid="social-auth">Social Auth Mock</div>,
}));

describe("LoginForm", () => {
  const mockMutateAsync = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  it("renders correctly", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields on submit", async () => {
    render(<LoginForm />);
    
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/O e-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/A senha é obrigatória/i)).toBeInTheDocument();
    });
    
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Email:/i);
    await user.type(emailInput, "invalid-email");
    
    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Insira um e-mail válido/i)).toBeInTheDocument();
    });
  });

  it("calls login mutation with correct data on successful submit", async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: "password123" } });
    
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows loading state when isPending is true", () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });

    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /Acessando.../i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Acessando.../i })).toBeDisabled();
  });
});
