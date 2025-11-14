"use client";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import GamesList from "@/components/catalog/GamesList";
import Button from "@/components/ui/Button";
import useUrlQueryParams from "@/hooks/useUrlQueryParams";
import { getGames } from "@/services/games";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";

function Home() {
  const { getParamValue, setParams } = useUrlQueryParams();
  const genre = getParamValue("genre");

  {
    /*
      NOTE: The API returns a totalPages property that is used to determine if there are more pages to fetch.
      When using "genre" filter, the API returns a totalPages property that is not correct.
    */
  }
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

      <div className="max-w-7xl mx-auto w-full px-4 lg:py-12 py-8">
        <GamesList games={games} loading={isLoading} />

        {hasNextPage && (
          <Button
            variant="primary"
            className="px-8 w-full sm:w-auto"
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

const HomeWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default HomeWithSuspense;
