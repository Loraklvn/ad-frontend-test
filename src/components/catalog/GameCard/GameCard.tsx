import Button from "@/components/ui/Button";
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import React from "react";

type GameCardProps = {
  game: Game;
  isItemInCart: boolean;
  onToggleCart: () => void;
};

const GameCard = ({ game, isItemInCart, onToggleCart }: GameCardProps) => {
  return (
    <div className="bg-white rounded-2xl border-[0.5px] border-border p-6 flex flex-col gap-5">
      <div className="relative h-[240px] w-full">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="rounded-t-2xl object-cover"
        />
        {game.isNew && (
          <div className="absolute top-3 left-3 bg-[#E5E5E5] rounded-sm px-3 py-2">
            <span className="text-black font-medium">New</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-[#737373] font-bold">{game.genre.toUpperCase()}</h3>

        <div className="mt-2 flex justify-between text-[#3B3B3B]">
          <h3 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
            {game.name}
          </h3>
          <p className="text-xl font-bold">${game.price}</p>
        </div>

        <Button
          variant={isItemInCart ? "primary" : "secondary"}
          className="w-full"
          onClick={onToggleCart}
        >
          {isItemInCart ? "REMOVE FROM CART" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
