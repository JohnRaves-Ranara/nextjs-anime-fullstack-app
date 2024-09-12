"use client"

import { useFilterAnime } from "@/app/services/queries/animes";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { SlidersHorizontal } from "lucide-react";
import AppliedFilters from "./components/AppliedFilters";
import CatalogAnimeList from "./components/CatalogAnimeList";
import FiltersDialog from "./components/FiltersDialog";
import {
  Format,
  Season,
  SortBy,
  AnilistAnimeStatus,
} from "@/utils/types/animeAnilist";
import { useSearchParams } from "next/navigation";
import AnimeCatalogPageLoading from "./loading";

export default function AnimeCatalogPage() {
  const { toggleOpenDialog } = useGlobalStore();
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const season = searchParams.get("season");
  const sortBy = searchParams.get("sortBy");
  const status = searchParams.get("status");
  const year = searchParams.get("year");
  const page = searchParams.get("page");

  const querySearch = searchParams.get("query") ?? undefined;
  const genresSearch = searchParams.get("genres") ?? undefined;
  const formatSearch = format ? (format as Format) : undefined;
  const seasonSearch = season ? (season as Season) : undefined;
  const sortBySearch = sortBy ? (sortBy as SortBy) : undefined;
  const yearSearch = year ? Number(year) : undefined;
  const statusSearch = status ? (status as AnilistAnimeStatus) : undefined;
  const pageSearch = page ? Number(page) : undefined;

  const {
    data: filteredAnimes,
    isLoading: isFilteredAnimesLoading,
    error: filteredAnimeError,
  } = useFilterAnime(
    querySearch?.trim(),
    seasonSearch,
    genresSearch?.trim(),
    yearSearch,
    sortBySearch,
    formatSearch,
    pageSearch,
    statusSearch
  );

  if (isFilteredAnimesLoading) {
    return <AnimeCatalogPageLoading/>
  }

  if (filteredAnimeError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this page.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (filteredAnimes) {
    return (
      <main className="w-full min-h-screen text-[#f6f4f4] pt-32 pb-28 px-3 sm:px-6 lg:px-16 flex flex-col gap-10">
        <header className="space-y-7 lg:space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Discover Animes
            </h1>
            <button
              onClick={() => toggleOpenDialog(<FiltersDialog />)}
              className="flex items-center gap-2 px-3 py-2 border rounded-full mobile-l:gap-3 mobile-l:px-4 md:px-5 md:py-3 group border-mainAccent"
            >
              <p className="text-xs font-medium transition-colors mobile-l:text-sm md:text-base group-hover:text-mainAccent">
                Filter
              </p>
              <SlidersHorizontal
                className="transition-colors size-3 sm:size-4 group-hover:stroke-mainAccent"
                strokeWidth={3}
              />
            </button>
          </div>
          <AppliedFilters />
        </header>
        {filteredAnimes.results.length !== 0 ? (
          <CatalogAnimeList animeList={filteredAnimes.results} />
        ) : (
          <div className="grid flex-grow text-base text-center md:text-lg place-items-center">
            Sorry, we could not find the Anime you were looking for.
          </div>
        )}
      </main>
    );
  }
}
