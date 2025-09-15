import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useAuthStore } from "@/stores/authStore";
import api from "@/services/api";
import { UserFunctions } from "@/stores/UserFunctions";

interface DishItem {
  _id?: string;
  restaurantId?: string;
  name: string;
  description: string;
  category: "Veg" | "Non-Veg" | string;
  price: number;
  isAvailable: boolean;
  image?: string | null;
}



export function DishCard({ item }: { item: DishItem }) {

  const { AuthUser } = useAuthStore();
  console.log("Item details:", item);
  const {fetchCart} = UserFunctions();

  // const handleOrder = async () => {
  //   try {

  //     if (!AuthUser || AuthUser.role !== "user") {
  //       console.error("Only users can place orders");
  //       return;
  //     }

  //     await api.post("/user/sendOrders", {
  //       restaurantId: item.restaurantId,
  //       menuItemId: item._id,
  //       quantity: 1,
  //       deliveryAddress: AuthUser.address,
  //     });

  //     console.log("order has been placed");
  //     alert("Your order has been placed");
  //   } catch (error) {
  //     console.log("Order failed:", error);
  //     alert("Order failed .Please try again");

  //   }
  // }

  const AddtoCart = async () => {

    try {
      if (!AuthUser || AuthUser.role !== "user") {
        console.error("Only users can add to cart");
        return;
      }
      console.log("AddtoCart function called");
      await api.post("/user/cart", {
        menuItemId: item._id,
        quantity: 1,
      });
      fetchCart();
      console.log("Item added to cart successfully");



    } catch (error) {
      console.log("Add to cart failed:", error);
      alert("failed to add to cart  .Please try again");
      
    }
  }

  return (
    <div className="group">
      <Card className="relative overflow-hidden border-0 hover:shadow-2xl">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <div className="relative ">
            <img
              src={item.image || "/placeholder.svg?height=300&width=300"}
              alt={item.name}
              className="object-cover"
            />
          </div>

          {/* Availability Badge */}
          {item.isAvailable ? (
            <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white border-0">
              Available
            </Badge>
          ) : (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white border-0">
              Not Available
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

          {/* Category + Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{item.category}</span>
            <span className="text-xl font-bold">
              ₹{item.price}
            </span>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={AddtoCart}
          >
            Add To cart
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}