import { Game } from "@/utils/endpoint";
import { X } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";

type CartGameCardProps = {
  game: Game;
  onRemoveFromCart: () => void;
};
const CartGameCard = ({
  game,
  onRemoveFromCart,
}: CartGameCardProps): ReactElement => {
  return (
    <div className="relative flex sm:flex-row flex-col sm:gap-6 gap-2 sm:pb-5 sm:px-4 items-start">
      <div className="relative sm:w-[256px] w-[92%] h-[156px]   ">
        <Image
          src={game.image}
          alt={game.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="flex-1 w-full flex justify-between items-start">
        <div className="flex flex-col justify-between w-full h-[156px] py-2">
          <div className="flex-1 flex flex-col gap-1.5">
            <p className="text-secondary font-bold uppercase sm:text-base text-sm">
              {game.genre}
            </p>
            <h3 className="sm:text-xl text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px]">
              {game.name}
            </h3>
            <p className="text-secondary text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
              {game.description}
            </p>
          </div>

          <p className="text-end  text-xl font-bold">${game.price}</p>
        </div>
      </div>

      <button
        className="text-border hover:text-foreground transition-colors absolute top-1 right-0 cursor-pointer"
        aria-label="Remove item"
        onClick={onRemoveFromCart}
      >
        <X size={20} />
      </button>
    </div>
  );
};
export default CartGameCard;
