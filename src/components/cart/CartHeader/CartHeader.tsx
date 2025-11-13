import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

const CartHeader = (): ReactElement => {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2  hover:text-muted-foreground transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span> Back to Catalog</span>
      </Link>

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-2xl">3 items</p>
      </div>
    </div>
  );
};
export default CartHeader;
