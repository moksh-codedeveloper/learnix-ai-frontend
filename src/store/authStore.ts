import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore"; // Import userStore
import {useRouter} from "next/navigation";
const router = useRouter();
// import axios from "@/utils/axios";
interface AuthState {
  loading: boolean;
  signup: (data: { username: string; email: string; password: string }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,

  signup: async (data) => {
    set({ loading: true });
    try {
      await axios.post("/api/user/signup", data);
      await useUserStore.getState().fetchUser(); // Fetch user data after signup
      console.log("Signup complete" + data);
      
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/user/login", credentials);
      await useUserStore.getState().fetchUser(); // Fetch user data after login
      console.log("login complete :-" + credentials);
      if(res.data.user.role){
        router.push("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.get("/api/user/logout");
      useUserStore.setState({ user: null }); // Clear user data on logout
      console.log("Logout complete");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
