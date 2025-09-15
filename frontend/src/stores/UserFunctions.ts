import { create } from "zustand";
import api from "@/services/api";

interface Restaurants {
  _id: string;
  name: string;
  address: string;
  image: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
}
interface CartsInterface {
  _id: string;              
  menuItem: MenuItem;        
  quantity: number;        
}
interface UserState {
  restaurants: Restaurants[];
  cartItem: CartsInterface[];
  isRestaurantLoading: boolean;
  isCartitemLoading: boolean;
  fetchRestaurant: () => Promise<void>;
  fetchCart:() => Promise<void>;
}

export const UserFunctions = create<UserState>((set) => ({
  restaurants:[],
  cartItem:[],
  isCartitemLoading: false,
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

  fetchCart : async () => {
    try{
      set({isCartitemLoading: true});
      const res = await api.get("/user/cart");
      console.log(res);
        
      set({cartItem: res.data.items || [] });
    }catch(error){
      console.log("Failed to fetch cart:", error);
      set({ cartItem: [] });
    } finally {
      set({isCartitemLoading: false})
    }
  },

}));