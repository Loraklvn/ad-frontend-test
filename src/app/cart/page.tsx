"use client";

import CartHeader from "@/components/cart/CartHeader";
import CartItems from "@/components/cart/CartItems";

export default function CartPage() {
  return (
    <main className="  bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <CartHeader />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 pr-10">
            <CartItems />
          </div>
        </div>
      </div>
    </main>
  );
}
