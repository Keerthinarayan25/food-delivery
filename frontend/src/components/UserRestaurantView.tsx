import { useState, useEffect } from "react";
import api from "@/services/api";

interface Restaurant {
  _id?: string;
  name: string;
  address: string;
  image: string;
}

export default function UserRestaurantView() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true); 
  console.log(restaurants);
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get("/user/restaurants");
        setRestaurants(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, []); // Empty dependency array, as this component only renders for users

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Browse Restaurants</h1>
      <p className="mt-2 text-gray-600">
        Explore local favorites and place your next order.
      </p>

      {loading ? (
        <p className="mt-4">Loading Restaurants...</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="border rounded-lg p-4 bg-white text-black shadow hover:shadow-lg transition"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-bold">{restaurant.name}</h2>
              <p className="text-sm text-gray-600">{restaurant.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}