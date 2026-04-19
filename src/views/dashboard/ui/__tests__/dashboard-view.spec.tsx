import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DashboardView } from "../dashboard-view";

// Mock high-level components
jest.mock("@/shared/ui/templates/app-shell/app-shell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div data-testid="app-shell">{children}</div>,
}));

jest.mock("@/features/shopping-list", () => ({
  CollectionsGrid: () => <div data-testid="collections-grid">Collections Grid Mock</div>,
}));

describe("DashboardView", () => {
  it("renders correctly with header and grid", () => {
    render(<DashboardView />);
    
    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByText(/Minhas Listas/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerencie e organize suas listas de compras/i)).toBeInTheDocument();
    expect(screen.getByTestId("collections-grid")).toBeInTheDocument();
  });
});
