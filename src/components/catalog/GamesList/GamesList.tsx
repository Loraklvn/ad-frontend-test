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

  if (loading) return <div>Loading...</div>;

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
