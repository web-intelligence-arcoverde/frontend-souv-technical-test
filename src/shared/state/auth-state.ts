import { proxy } from "valtio";

interface User {
  uid: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
}

export const authState = proxy<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  status: "idle",
});

export const authActions = {
  setUser: (user: User | null) => {
    authState.user = user;
    authState.isAuthenticated = !!user;
    authState.isLoading = false;
    authState.status = user ? "authenticated" : "unauthenticated";
  },
  
  setLoading: (isLoading: boolean) => {
    authState.isLoading = isLoading;
  },
  
  logout: () => {
    authState.user = null;
    authState.isAuthenticated = false;
    authState.status = "unauthenticated";
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
};
