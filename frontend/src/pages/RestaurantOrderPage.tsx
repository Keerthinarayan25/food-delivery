import { useParams } from "react-router-dom";
import RestaurantOrders from "@/components/Restaurant comp/RestaurantOrders";

export default function RestaurantOrdersPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  if (!restaurantId) return <p>Restaurant ID missing</p>;
  return <RestaurantOrders restaurantId={restaurantId} />;
}
