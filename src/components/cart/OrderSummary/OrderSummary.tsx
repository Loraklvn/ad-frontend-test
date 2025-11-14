"use client";

import Button from "@/components/ui/Button";
import { Game } from "@/utils/endpoint";

type OrderSummaryProps = {
  orderItems: Game[];
  orderTotal: number;
};

export default function OrderSummary({
  orderItems,
  orderTotal,
}: OrderSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="bg-card border border-border rounded-lg px-6 py-8">
        <h2 className="sm:text-2xl text-xl font-bold  mb-2">Order Summary</h2>
        <p className="text-lg text-primary mb-8">{orderItems.length} items</p>

        <div className="space-y-4 mb-6">
          {orderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-lg]">{item.name}</p>
              <p className="text-lg">$ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border my-6"></div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold">Order Total</p>
          <p className="text-xl font-bold">${orderTotal.toFixed(2)}</p>
        </div>
      </div>

      <Button variant="primary" className="w-full">
        Checkout
      </Button>
    </div>
  );
}
