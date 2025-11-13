"use client";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import GamesList from "@/components/catalog/GamesList";
import Button from "@/components/ui/Button";
import useUrlQueryParams from "@/hooks/useUrlQueryParams";
import { getGames } from "@/services/games";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Home() {
  const { getParamValue, setParams } = useUrlQueryParams();
  const genre = getParamValue("genre");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["games", genre],
      queryFn: ({ pageParam = 1 }) =>
        getGames({ genre: genre || undefined, page: pageParam }),
      getNextPageParam: (lastResponse) =>
        lastResponse.currentPage < lastResponse.totalPages
          ? lastResponse.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });

  const games = data?.pages.flatMap((p) => p.games) ?? [];

  const handleSelectGenre = (genre: string) => setParams({ genre });

  return (
    <main>
      <CatalogHeader
        selectedGenre={genre || ""}
        setSelectedGenre={handleSelectGenre}
      />

      <div className="max-w-7xl mx-auto w-full px-4 py-12">
        <GamesList games={games} loading={isLoading} />

        {hasNextPage && (
          <Button
            variant="primary"
            className="px-8"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "See more →"}
          </Button>
        )}
      </div>
    </main>
  );
}
