"use client";

import Button from "@/components/ui/Button";

interface OrderItem {
  name: string;
  price: number;
}

const mockOrderItems: OrderItem[] = [
  { name: "Product Name", price: 0 },
  { name: "Product Name", price: 0 },
  { name: "Product Name", price: 0 },
];

const ORDER_TOTAL = 0;

export default function OrderSummary() {
  return (
    <div className="space-y-3">
      <div className="bg-card border border-border rounded-lg px-6 py-8">
        <h2 className="text-2xl font-bold  mb-2">Order Summary</h2>
        <p className="text-lg text-primary mb-8">3 items</p>

        <div className="space-y-4 mb-6">
          {mockOrderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-lg]">{item.name}</p>
              <p className="text-lg">$ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border my-6"></div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold">Order Total</p>
          <p className="text-xl font-bold">${ORDER_TOTAL.toFixed(2)}</p>
        </div>
      </div>

      <Button variant="primary" className="w-full">
        Checkout
      </Button>
    </div>
  );
}
