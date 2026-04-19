import "@testing-library/jest-dom";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { RegisterProductForm } from "../register-product-form";
import { useRegisterProduct } from "../../hooks/use-register-product";
import { useForm, FormProvider } from "react-hook-form";
import React from 'react';

// Mock the hook
jest.mock("../../hooks/use-register-product", () => ({
  useRegisterProduct: jest.fn(),
}));

describe("RegisterProductForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (overrides = {}) => {
    const { result } = renderHook(() => useForm({
      defaultValues: {
        item: "",
        marketName: "",
        price: 0,
        quantity: { unit: "un", quantity: 1 },
        category: "",
      }
    }));

    const mockMethods = {
      handleSubmit: (fn: any) => (e: any) => { e.preventDefault(); fn(); },
      onSubmit: mockOnSubmit,
      control: result.current.control,
      errors: {},
      isValid: true,
      isPending: false,
      ...overrides
    };

    (useRegisterProduct as jest.Mock).mockReturnValue(mockMethods);

    return render(
      <FormProvider {...result.current}>
        <RegisterProductForm />
      </FormProvider>
    );
  };

  it("renders all form fields", () => {
    setup();
    
    expect(screen.getByLabelText(/Nome do Produto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Mercado:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço Unit/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoria:/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar/i)).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    setup();
    
    const submitButton = screen.getByText(/Adicionar/i).closest("button")!;
    fireEvent.submit(submitButton.closest("form")!);
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("disables submit button when form is invalid", () => {
    setup({ isValid: false });
    
    const submitButton = screen.getByText(/Adicionar/i).closest("button")!;
    expect(submitButton).toBeDisabled();
  });

  it("shows loading state when isPending is true", () => {
    setup({ isPending: true });
    
    expect(screen.getByText(/Adicionando.../i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionando.../i).closest("button")).toBeDisabled();
  });
});
