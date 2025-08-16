import { useEffect } from "react";
import { useMenuStore } from "@/stores/useMenuStore";

interface RestaurantMenuProps {
  restaurantId: string;
}

export default function RestaurantMenu({ restaurantId }: RestaurantMenuProps) {
  const { menuItems, fetchMenu } = useMenuStore();

  useEffect(() => {
    if (restaurantId) {
      fetchMenu(restaurantId);
    }
  }, [restaurantId, fetchMenu]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Restaurant Menu</h2>

      {menuItems.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item._id}
              className="border p-3 rounded-lg shadow-sm flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {item.category} | ₹{item.price}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.isAvailable
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.isAvailable ? "Available" : "Not Available"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
