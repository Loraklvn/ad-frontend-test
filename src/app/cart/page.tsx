"use client";

import CartItems from "@/components/cart/CartItems";
import CartHeader from "@/components/cart/CartHeader";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  return (
    <main className="  bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <CartHeader />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 md:pr-10">
            <CartItems />
          </div>

          <div className="lg:col-span-2 md:pl-6">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
