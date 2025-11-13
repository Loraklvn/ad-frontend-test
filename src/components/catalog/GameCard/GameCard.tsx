import Button from "@/components/ui/Button";
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import React from "react";

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="bg-white rounded-2xl border-[0.5px] border-[#8F8F8F] p-6 flex flex-col gap-5">
      <Image
        src={game.image}
        alt={game.name}
        width={332}
        height={240}
        className="rounded-t-2xl h-[240px] w-full object-cover"
      />

      <div>
        <h3 className="text-[#737373] font-bold">{game.genre.toUpperCase()}</h3>

        <div className="mt-2 flex justify-between text-[#3B3B3B]">
          <h3 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
            {game.name}
          </h3>
          <p className="text-xl font-bold">${game.price}</p>
        </div>

        <Button variant="secondary" className="w-full">
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
