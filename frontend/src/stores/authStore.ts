import { create } from 'zustand';
import api from '@/services/api';

export type UserRole = 'user' | 'restaurant';

interface UserProfile {
  _id: string;
  userName: string;
  address: string;
  email: string;
  role: 'user';
}

interface RestaurantProfile {
  _id: string;
  restaurantName: string;
  restaurantAddress: string;
  email: string;
  role: 'restaurant';
}

type AuthUser = UserProfile | RestaurantProfile;
interface LoginData {
  email: string;
  password: string;
}
interface SignupData {
  userName:string;
  address:string;
  email:string;
  role:UserRole;
}

interface AuthState {
  AuthUser: AuthUser | null;
  isSignedUp: boolean;
  isLogedIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  login: (userData: LoginData) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  AuthUser: null,
  isSignedUp: false,
  isLogedIn: false,
  isCheckingAuth: true,


  checkAuth: async () => {
    try {
      const res = await api.get("/auth/checkAuth");

      set({ AuthUser: res.data, isLogedIn: true });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ AuthUser: null, isLogedIn: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData:SignupData) => {
    try {
      const res = await api.post("/auth/signup", userData);
      set({ isSignedUp: true, AuthUser: res.data, isLogedIn: true });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  },


  login: async (userData: LoginData) => {
    try {
      const res = await api.post("/auth/login", userData);
      set({ AuthUser: res.data, isLogedIn: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },


  logout: async () => {
    try {

      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {

      set({ AuthUser: null, isLogedIn: false });
    }
  },

}

));
