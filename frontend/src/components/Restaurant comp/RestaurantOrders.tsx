// components/RestaurantOrders.tsx
import { useEffect } from "react";
import { useOrderStore } from "@/stores/RestaurantFunctions";
import { Card, CardContent } from "../ui/card";

interface Props {
  restaurantId: string;
}

export default function RestaurantOrders({ restaurantId }: Props) {
  const { orders, fetchOrdersForRestaurant, clearOrders } = useOrderStore();

  useEffect(() => {
    if (restaurantId) {
      clearOrders();
      fetchOrdersForRestaurant(restaurantId);
    }
  }, [restaurantId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders Received</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-4">
              <CardContent>
                <h3 className="font-semibold">
                  {order.items[0]?.menuItem?.name}   {/* show first item */}
                </h3>
                <p>
                  Ordered by: {order.user?.name} ({order.user?.email})
                </p>
                <p>Quantity: {order.items[0]?.quantity}</p>
                <p>Delivery Address: {order.deliveryAddress}</p>
                <p>Status: {order.status}</p>
                <p className="text-xs text-gray-500">
                  Placed at: {new Date(order.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}

        </div>
      )}
    </div>
  );
}
