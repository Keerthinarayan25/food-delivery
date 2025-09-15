import { useState } from "react";
import { Button } from "./ui/button"; 
import { Trash2, Plus, Minus } from "lucide-react";
import api from "@/services/api";  
import { UserFunctions } from "@/stores/UserFunctions";

interface CartItemActionsProps {
  cartItemId: string;       
  currentQuantity: number;  
  productName: string;      
}

export function CartItemActions({
  cartItemId,
  currentQuantity,
  productName,
}: CartItemActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCart } = UserFunctions();

  // Remove item
  const handleRemove = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/user/cart/${cartItemId}`);
      console.log(`${productName} removed from cart`);
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update quantity
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      setIsLoading(true);
      await api.put(`/user/cart/${cartItemId}`, { quantity: newQuantity });
      console.log("Quantity updated!");
      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(currentQuantity - 1)}
          disabled={isLoading || currentQuantity <= 1}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center font-medium">{currentQuantity}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(currentQuantity + 1)}
          disabled={isLoading}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        disabled={isLoading}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
