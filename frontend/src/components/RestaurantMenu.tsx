import { useEffect } from "react";
import { useMenuStore } from "@/stores/useMenuStore";

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
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col" // Card styling
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover" // Image at the top of the card
                />
              )}
              <div className="p-4 flex-grow"> {/* Content area, flex-grow to push status to bottom */}
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {item.category} | ₹{item.price}
                </p>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t flex justify-end"> {/* Status at the bottom */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
