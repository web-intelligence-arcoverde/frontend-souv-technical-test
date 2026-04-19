import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateListModal } from "../create-list-modal";
import { useCreateListModal } from "../../hooks/use-create-list-modal";
import React from 'react';

// Mock the hook
jest.mock("../../hooks/use-create-list-modal");

// Mock Radix Dialog components
jest.mock("@radix-ui/react-dialog", () => ({
  __esModule: true,
  Root: ({ children, open }: any) => (open ? <div data-testid="dialog-root">{children}</div> : null),
  Portal: ({ children }: any) => <>{children}</>,
  Overlay: () => null,
  Content: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  Title: ({ children }: any) => <h2>{children}</h2>,
  Close: ({ children }: any) => <div>{children}</div>,
}));

// Mock react-hook-form Controller
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  Controller: ({ render, field }: any) => render({ 
    field: { 
      onChange: jest.fn(), 
      value: false,
      onBlur: jest.fn(),
      name: "shared",
      ref: { current: null }
    },
    fieldState: { error: undefined, invalid: false, isDirty: false, isTouched: false },
    formState: { isSubmitted: false, submitCount: 0, isSubmitting: false, isSubmitSuccessful: false, isValid: true, isValidating: false, dirtyFields: {}, touchedFields: {}, errors: {} }
  }),
}));

// Mock sub-components
jest.mock("@/shared/ui/molecules/Input/Input", () => ({
  InputWithLabel: ({ label }: any) => <div><label>{label}</label></div>,
}));
jest.mock("@/shared/ui/molecules/Textarea/Textarea", () => ({
  TextareaWithLabel: ({ label }: any) => <div><label>{label}</label></div>,
}));
jest.mock("@/shared/ui/molecules/theme-selector/theme-selector", () => ({
  ThemeSelector: ({ label }: any) => <div><label>{label}</label></div>,
}));
jest.mock("@/components/ui/checkbox", () => ({
  Checkbox: () => <input type="checkbox" />,
}));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled, type, className }: any) => (
    <button onClick={onClick} disabled={disabled} type={type} className={className}>{children}</button>
  ),
}));

describe("CreateListModal Component", () => {
  const mockOnOpenChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (overrides = {}) => {
    (useCreateListModal as jest.Mock).mockReturnValue({
      control: {},
      onSubmit: mockOnSubmit,
      isPending: false,
      errors: {},
      ...overrides
    });

    return render(<CreateListModal isOpen={true} onOpenChange={mockOnOpenChange} />);
  };

  it("renders correctly when open", () => {
    setup();
    expect(screen.getByText("Criar Lista de Compras")).toBeInTheDocument();
    expect(screen.getByText(/Nome da Lista de Compras:/i)).toBeInTheDocument();
    expect(screen.getByText("Compartilhar Lista")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    setup();
    const submitButton = screen.getByText("Criar");
    fireEvent.submit(submitButton.closest("form")!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("shows loading state when isPending is true", () => {
    setup({ isPending: true });
    expect(screen.getByText("Criando...")).toBeInTheDocument();
  });
});
