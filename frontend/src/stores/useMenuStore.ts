import api from "@/services/api";
import { create } from "zustand";

interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  category: "Veg" | "non-Veg";
  price: number;
  isAvailable: boolean;
  image?: string | null;
}

interface MenuState {
  menuItems: MenuItem[];
  fetchMenu: (restaurantId: string) => Promise<void>;
  fetchMenuforUser: (restaurantId: string) => Promise<void>;
  clearMenu:()=>void;
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


  fetchMenuforUser: async(restaurantId: string) =>{
    try {
      const res = await api.get(`/user/restaurants/${restaurantId}/menu`);
      const data = res.data;
      console.log("useMenu store fetchBy restaurant:", data);
      if (data && data.data) {
        set({ menuItems: data.data });
      }
    } catch (err) {
      console.error("Error in fetchMenu:", err);
    }

  },

  clearMenu:() => set({menuItems:[]})
}));
