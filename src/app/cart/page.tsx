"use client";

import CartItems from "@/components/cart/CartItems";
import CartHeader from "@/components/cart/CartHeader";
import OrderSummary from "@/components/cart/OrderSummary";
import useShoppingCart from "@/hooks/useShoppingCart";

export default function CartPage() {
  const { cartItems, removeFromCart } = useShoppingCart();

  return (
    <main className="  bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <CartHeader totalItems={cartItems.length} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 md:pr-10">
            <CartItems
              cartItems={cartItems}
              onRemoveFromCart={(id) => removeFromCart(id)}
            />
          </div>

          <div className="lg:col-span-2 md:pl-6">
            <OrderSummary
              orderItems={cartItems}
              orderTotal={cartItems.reduce((acc, item) => acc + item.price, 0)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
