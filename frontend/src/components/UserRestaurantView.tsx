import { useEffect } from "react";
import { UserFunctions } from "@/stores/UserFunctions";



export default function UserRestaurantView() {
  const { restaurants, isRestaurantLoading, fetchRestaurant } = UserFunctions();
  console.log(restaurants);
  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Browse Restaurants</h1>
      <p className="mt-2 text-gray-600">
        Explore local favorites and place your next order.
      </p>

      {isRestaurantLoading ? (
        <p className="mt-4">Loading Restaurants...</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant._id}
              className="border rounded-lg p-4 bg-white text-black shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-60 object-cover rounded-md mb-2"
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