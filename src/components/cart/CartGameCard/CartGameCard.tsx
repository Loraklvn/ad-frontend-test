import { Game } from "@/utils/endpoint";
import { X } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";

type CartGameCardProps = {
  game: Game;
};
const CartGameCard = ({ game }: CartGameCardProps): ReactElement => {
  return (
    <div className="flex gap-6 pb-5 px-4 items-start">
      <div className="flex-shrink-0  ">
        <Image
          src={game.image}
          alt={game.name}
          className="w-[256px] h-[156px] object-cover"
          width={256}
          height={156}
        />
      </div>

      <div className="flex-1 flex justify-between items-start">
        <div className="flex flex-col justify-between w-full h-[156px] py-2">
          <div className="flex-1 flex flex-col gap-1.5">
            <p className="text-secondary font-bold">
              {game.genre.toUpperCase()}
            </p>
            <h3 className="text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px]">
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
        className="text-border hover:text-foreground transition-colors "
        aria-label="Remove item"
      >
        <X size={20} />
      </button>
    </div>
  );
};
export default CartGameCard;
