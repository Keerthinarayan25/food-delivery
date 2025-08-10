import RestaurantDashboard from "@/components/RestauratDashboard";
import UserRestaurantView from "@/components/UserRestaurantView";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Homepage() {
  const { AuthUser, isLogedIn } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLogedIn) {
      navigate("/login");
    }
  }, [isLogedIn, navigate]);



  if (!isLogedIn) return null;

  // Restaurant dashboard
  if (AuthUser?.role === "restaurant") {
    return <RestaurantDashboard/>
  }

  // Customer browsing
  if (AuthUser?.role === "user") {
    return <UserRestaurantView/>
  }

  return null;
}
