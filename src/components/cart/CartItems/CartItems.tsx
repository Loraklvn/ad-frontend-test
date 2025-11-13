"use client";

import { classNames } from "@/utils";
import { allGames } from "@/utils/endpoint";
import CartGameCard from "../CartGameCard";

const mockCartItems = allGames.slice(0, 3);

export default function CartItems() {
  return (
    <div className="space-y-4 ">
      {mockCartItems.map((item, index) => (
        <div
          key={item.id}
          className={classNames(
            index !== mockCartItems.length - 1 ? "border-b border-border" : ""
          )}
        >
          <CartGameCard game={item} />
        </div>
      ))}
    </div>
  );
}
