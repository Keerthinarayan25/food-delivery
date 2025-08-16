import { create } from "zustand";
import api from "@/services/api";

interface Restaurants {
  _id: string;
  name: string;
  address: string;
  image: string;
}
interface UserState {
  restaurants: Restaurants[];
  isRestaurantLoading: boolean;
  fetchRestaurant: () => Promise<void>;
}

export const UserFunctions = create<UserState>((set) => ({
  restaurants:[],
  isRestaurantLoading: false,

  fetchRestaurant: async () => {
    try {
      set({isRestaurantLoading: true});
      const res = await api.get("/user/restaurants");
      set({restaurants: res.data.data});
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    } finally {
      set({isRestaurantLoading: false});
    }
  },

}));