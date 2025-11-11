import CartIcon from "@/components/Icons/CartIcon";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-[#EEEEEE] h-16">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto h-full">
        <Link href="/" className="text-2xl font-bold text-[#585660]">
          <span>GamerShop</span>
        </Link>

        <Link href="/cart" className="text-2xl font-bold text-[#585660]">
          <CartIcon />
        </Link>
      </div>
    </nav>
  );
}
