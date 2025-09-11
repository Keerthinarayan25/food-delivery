import { create } from "zustand";
import api from "@/services/api";

interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  deliveryAddress: string;
  status: string;
  createdAt: string;
}


interface OrderState {
  orders: Order[];
  fetchOrdersForRestaurant: (restaurantId: string) => Promise<void>;
  clearOrders: () => void;
}


export const useOrderStore = create<OrderState>((set) => ({
  orders: [],

  fetchOrdersForRestaurant: async (restaurantId: string) => {
    try {
      const res = await api.get(`/restaurant/${restaurantId}/orders`);
      set({ orders: res.data.data });
      console.log(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      set({ orders: [] });
    }
  },

  clearOrders: () => set({ orders: [] }),
}));