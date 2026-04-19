import { authState, authActions } from "../auth";

describe("authStore", () => {
  beforeEach(() => {
    // Reset state before each test
    authActions.setUser(null);
    localStorage.clear();
  });

  it("should initialize with default values", () => {
    expect(authState.user).toBeNull();
    expect(authState.isAuthenticated).toBe(false);
  });

  it("should set user and update status to authenticated", () => {
    const mockUser = { uid: "1", email: "test@test.com", name: "Test User" };
    authActions.setUser(mockUser);

    expect(authState.user).toEqual(mockUser);
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.status).toBe("authenticated");
    expect(authState.isLoading).toBe(false);
  });

  it("should set loading state correctly", () => {
    authActions.setLoading(true);
    expect(authState.isLoading).toBe(true);

    authActions.setLoading(false);
    expect(authState.isLoading).toBe(false);
  });

  it("should clear state and localStorage on logout", () => {
    const mockUser = { uid: "1", email: "test@test.com", name: "Test User" };
    authActions.setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));

    authActions.logout();

    expect(authState.user).toBeNull();
    expect(authState.isAuthenticated).toBe(false);
    expect(authState.status).toBe("unauthenticated");
    expect(localStorage.getItem("user")).toBeNull();
  });
});
