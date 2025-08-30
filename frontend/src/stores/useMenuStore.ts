import api from "@/services/api";
import { create } from "zustand";

interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  category: "Veg" | "non-Veg";
  price: number;
  isAvailable: boolean;
  image?: File | null;
}

interface MenuState {
  menuItems: MenuItem[];
  fetchMenu: (restaurantId: string) => Promise<void>;
  fetchByRestaurant: (restaurantId: string) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuItems: [],

  fetchMenu: async (restaurantId: string) => {
    try {
      const res = await api.get("/restaurants/menu", { params: { restaurantId } });
      const data = res.data;
      if (data && data.data) {
        set({ menuItems: data.data });
      }
    } catch (err) {
      console.error("Error in fetchMenu:", err);
    }
  },


  fetchByRestaurant: async(restaurantId: string) =>{
    try {
      const res = await api.get(`/user/restaurants/${restaurantId}/menu`);
      const data = res.data;
      if (data && data.data) {
        set({ menuItems: data.data });
      }
    } catch (err) {
      console.error("Error in fetchMenu:", err);
    }

  }
}));
