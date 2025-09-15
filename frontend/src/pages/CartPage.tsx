import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { UserFunctions } from "@/stores/UserFunctions";
import { Card, CardContent } from "@/components/ui/card";
import { CartItemActions } from "@/components/CartItemActions";

export default function CartPage() {
  const { cartItem, fetchCart } = UserFunctions();

  const totalAmount = cartItem.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,0);

  const savings = totalAmount * 0.15;
  const deliveryCharge = totalAmount > 100 ? 0 : 29.99;
  const finalTotal = totalAmount - savings + deliveryCharge;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItem.length} {cartItem.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItem.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 flex items-center gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{item.menuItem.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.menuItem.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <CartItemActions
                        cartItemId={item._id}
                        currentQuantity={item.quantity}
                        productName={item.menuItem.name}
                      />
                      <div className="text-sm text-muted-foreground">
                        ₹{item.menuItem.price} each
                      </div>
                    </div>

                    <div className="text-right font-bold text-xl text-purple-600">
                      ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 space-y-4 h-fit">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Savings (15%)</span>
              <span>-₹{savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Charge</span>
              <span>
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toFixed(2)}`}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
