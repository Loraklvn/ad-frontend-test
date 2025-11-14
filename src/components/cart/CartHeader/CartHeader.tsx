import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

type CartHeaderProps = {
  totalItems: number;
};

const CartHeader = ({ totalItems }: CartHeaderProps): ReactElement => {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2  hover:text-muted-foreground transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span> Back to Catalog</span>
      </Link>

      <div className="sm:mt-8 mt-4">
        <h1 className="sm:text-4xl text-2xl font-bold text-foreground mb-2">
          Your Cart
        </h1>
        <p className="sm:text-2xl text-xl">{totalItems} items</p>
      </div>
    </div>
  );
};
export default CartHeader;
