import { create } from "zustand";
import axios from "axios";
// import { useRouter } from "next/navigation";
// const router = useRouter();
interface User {
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/user/me", {withCredentials: true});
      set({ user: response.data });
    } catch (error:any) {
      if (error.response?.status === 401) {
        set({ user: null });
      } else {
        console.log("Failed to fetch user:", error.message);
      }
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true });
    try {
      await axios.put("/api/user/profile", data);
      set((state) => ({
        user: {
          ...state.user!, // Ensure user is not null
          ...data,
        },
      }));
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
