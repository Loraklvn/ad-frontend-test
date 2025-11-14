"use client";

import { classNames } from "@/utils";
import { Game } from "@/utils/endpoint";
import CartGameCard from "../CartGameCard";

type CartItemsProps = {
  cartItems: Game[];
  onRemoveFromCart: (id: string) => void;
};

export default function CartItems({
  cartItems,
  onRemoveFromCart,
}: CartItemsProps) {
  return (
    <div className="space-y-4 ">
      {cartItems.map((item, index) => (
        <div
          key={item.id}
          className={classNames(
            "border-border",
            index !== cartItems.length - 1 ? "border-b " : ""
          )}
        >
          <CartGameCard
            game={item}
            onRemoveFromCart={() => onRemoveFromCart(item.id)}
          />
        </div>
      ))}
    </div>
  );
}
