import { useAuthStore } from "@/stores/authStore";


export default function RestaurantDashboard() {
  const { AuthUser } = useAuthStore();

  if (!AuthUser || AuthUser.role !== "restaurant") {
    return <p>You must be logged in as a restaurant to access this dashboard.</p>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage your menu, view orders, and track performance here.
      </p>
    </div>
  );
}