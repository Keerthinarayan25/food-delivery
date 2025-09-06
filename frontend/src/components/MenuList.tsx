import { useState } from "react";
import DishForm from "./Restaurant comp/DishForm";
import RestaurantMenu from "./RestaurantMenu";
import { Button } from "./ui/button";
export default function MenuList({ restaurantId }: { restaurantId: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">

        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Back to Menu" : "Add Dish"}
        </Button>
        
      </div>

      {showForm ? (
        <DishForm restaurantId={restaurantId} />
      ) : (
        <RestaurantMenu restaurantId={restaurantId} />
      )}
    </div>
  );
}
