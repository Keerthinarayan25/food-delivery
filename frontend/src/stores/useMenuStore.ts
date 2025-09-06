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

      console.log("useMenu store fetchBy restaurant:", res.data);
      set({
      menuItems: res.data.data.map((item: MenuItem) => ({
        ...item,
        restaurantId,
      })),
      
    });
    } catch (err) {
      console.error("Error in fetchMenu:", err);
      set({ menuItems: [] });
    }

  },

  clearMenu:() => set({menuItems:[]})
}));
