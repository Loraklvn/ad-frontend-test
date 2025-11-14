import { Game } from "@/utils/endpoint";
import React, { useCallback } from "react";
import GameCard from "../GameCard";
import useShoppingCart from "@/hooks/useShoppingCart";

type GamesListProps = {
  games: Game[];
  loading: boolean;
};
const GamesList = ({ games, loading }: GamesListProps) => {
  const { isItemInCart, addItem, removeFromCart } = useShoppingCart();

  const handleToggleCart = useCallback((game: Game) => {
    if (isItemInCart(game.id)) {
      removeFromCart(game.id);
    } else {
      addItem(game);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-[700px]"
        data-testid="loading-state"
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isItemInCart={isItemInCart(game.id)}
          onToggleCart={() => handleToggleCart(game)}
        />
      ))}
    </div>
  );
};

export default GamesList;
