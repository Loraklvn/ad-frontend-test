"use client";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import GamesList from "@/components/catalog/GamesList";
import { getGames } from "@/services/games";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: async () => await getGames(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <main>
      <CatalogHeader />

      <div className="max-w-7xl mx-auto w-full px-4 py-12">
        <GamesList games={data?.games || []} loading={isLoading} />
      </div>
    </main>
  );
}
