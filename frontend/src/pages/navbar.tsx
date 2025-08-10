import React from "react";
import { useAuthStore } from "@/stores/authStore";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Navbar: React.FC = () => {
  const { AuthUser, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <h1 className="text-lg font-bold text-gray-800">Foodie App</h1>
            </Link>

            {/* Role-Based Links */}
            {AuthUser && (
              <nav className="flex gap-4">
                {AuthUser.role === "user" && (
                  <>
                    <Link
                      to="/user/home"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Home
                    </Link>
                    <Link
                      to="/user/orders"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/user/profile"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Profile
                    </Link>
                  </>
                )}

                {AuthUser.role === "restaurant" && (
                  <>
                    <Link
                      to="/restaurant/dashboard"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/restaurant/menu"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Menu
                    </Link>
                    <Link
                      to="/restaurant/orders"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      Orders
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>

          {/* Right Section: Auth buttons */}
          <div className="flex items-center gap-3">
            {!AuthUser ? (
              <>
                <Button variant="secondary">
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
                <Button>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <Button onClick={logout}>
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
