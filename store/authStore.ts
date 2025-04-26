// store/authStore.ts
import { getUser } from "@/utils/getUser";
import { create } from "zustand";

export interface User {
  id?: string;
  email?: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  login: (credentials: { email: string; password: string }) => boolean;
  register: (data: User) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  login: ({ email, password }) => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user) {
        if (user.email != email || user.password != password) {
          alert("Invalid Username or Password");
          return false;
        }
      } else {
        alert("Invalid Username or Password");
        return false;
      }

      set({
        isAuthenticated: true,
      });

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  register: (userData: User) => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user) {
        if (user.email == userData.email) {
          alert("Email already exists");
          return false;
        }
      }

      localStorage.setItem("user", JSON.stringify(userData));

      set({
        user: userData,
        isAuthenticated: true,
      });

      return true;
    } catch (err) {
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    set({ user: null, isAuthenticated: false });
  },
}));
