import { useEffect } from "react";
import { useMenuStore } from "@/stores/useMenuStore";
import { DishCard } from "./DishCard";
interface RestaurantMenuProps {
  restaurantId: string;
}

export default function RestaurantMenu({ restaurantId }: RestaurantMenuProps) {
  const { menuItems, fetchMenuforUser, clearMenu } = useMenuStore();

  useEffect(() => {
    if (restaurantId) {
      clearMenu();
      fetchMenuforUser(restaurantId);
    }
  }, [restaurantId, fetchMenuforUser, clearMenu]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Restaurant Menu</h2>

      {menuItems.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id}>
              <DishCard item = {item} />
            </div>

          ))}
        </div>
      )}
    </div>
  );
}
