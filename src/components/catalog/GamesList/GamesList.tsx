import { Game } from "@/utils/endpoint";
import React from "react";
import GameCard from "../GameCard";

type GamesListProps = {
  games: Game[];
  loading: boolean;
};
const GamesList = ({ games, loading }: GamesListProps) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
