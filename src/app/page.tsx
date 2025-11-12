"use client";

import CatalogHeader from "@/components/catalog/CatalogHeader";
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
    </main>
  );
}
