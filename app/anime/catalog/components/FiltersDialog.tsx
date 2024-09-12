"use client";

import { useGlobalStore } from "@/utils/stores/globalStore";
import {
  AnilistAnimeStatus,
  Format,
  Genre,
  Season,
  SortBy,
} from "@/utils/types/animeAnilist";
import FilterPill from "./FilterPill";
import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import {
  formatLabels,
  seasonLabels,
  sortByLabels,
  anilistAnimeStatusLabels,
} from "@/utils/variables/anime";
import { useSearchParams, useRouter } from "next/navigation";
import { isEqual } from "radash";
import { X } from "lucide-react";

const genres = Object.values(Genre);
const formats = Object.values(Format);
const seasons = Object.values(Season);
const sortBys = Object.values(SortBy);
const statuses = Object.values(AnilistAnimeStatus);
const startYear = 1970;
const endYear = new Date().getFullYear();
const years = Array.from({ length: endYear - startYear + 1 }).map(
  (_, i) => endYear - i
);

type Filters = {
  sortBy: SortBy;
  format?: Format;
  status?: AnilistAnimeStatus;
  season?: Season;
  year?: number;
  genres: Genre[] | [];
};

export default function FiltersDialog() {
  const { toggleOpenDialog } = useGlobalStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const format = searchParams.get("format");
  const season = searchParams.get("season");
  const sortBy = searchParams.get("sortBy");
  const status = searchParams.get("status");
  const year = searchParams.get("year");

  const genresSearch = searchParams.get("genres");
  const formatSearch = format ? (format as Format) : undefined;
  const seasonSearch = season ? (season as Season) : undefined;
  const sortBySearch = sortBy ? (sortBy as SortBy) : undefined;
  const yearSearch = year ? Number(year) : undefined;
  const statusSearch = status ? (status as AnilistAnimeStatus) : undefined;

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    genresSearch ? genresSearch.split(",").map((genre) => genre as Genre) : []
  );
  const [selectedFormat, setSelectedFormat] = useState<Format | undefined>(
    formatSearch ? formatSearch : undefined
  );
  const [selectedSeason, setSelectedSeason] = useState<Season | undefined>(
    seasonSearch ? seasonSearch : undefined
  );
  const [selectedSortBy, setSelectedSortBy] = useState<SortBy>(
    sortBySearch ? sortBySearch : SortBy.TRENDING_DESC
  );
  const [selectedStatus, setSelectedStatus] = useState<
    AnilistAnimeStatus | undefined
  >(statusSearch ? statusSearch : undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearSearch ? yearSearch : undefined
  );

  const [initialFilters] = useState<Filters>({
    format: selectedFormat,
    genres: selectedGenres,
    season: selectedSeason,
    sortBy: selectedSortBy,
    status: selectedStatus,
    year: selectedYear,
  });

  function selectGenre(genre: Genre) {
    setSelectedGenres([...selectedGenres, genre]);
  }

  function deselectGenre(genre: Genre) {
    setSelectedGenres(
      selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
    );
  }

  function clearFilters() {
    setSelectedGenres([]);
    setSelectedFormat(undefined);
    setSelectedSeason(undefined);
    setSelectedSortBy(SortBy.TRENDING_DESC);
    setSelectedStatus(undefined);
    setSelectedYear(undefined);
  }

  function applyFilters() {
    const appliedFilters: Filters = {
      sortBy: selectedSortBy ?? SortBy.TRENDING_DESC,
      format: selectedFormat ?? undefined,
      status: selectedStatus ?? undefined,
      season: selectedSeason ?? undefined,
      year: selectedYear ?? undefined,
      genres: selectedGenres ?? [],
    };
    if (!isEqual(initialFilters, appliedFilters)) {
      const queryParams = {
        format: selectedFormat,
        genres:
          selectedGenres.length !== 0 ? selectedGenres.join(",") : undefined,
        season: selectedSeason,
        sortBy:
          selectedSortBy !== initialFilters.sortBy ? selectedSortBy : undefined,
        status: selectedStatus,
        year: selectedYear,
      };
      const newSearchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          newSearchParams.append(key, value as string);
        }
      });
      router.push(`/anime/catalog?${newSearchParams.toString()}`);
    }
    toggleOpenDialog(null);
  }

  return (
    <div className="max-w-full w-dvw bg-black/50">
      <div className="xl:max-w-[1200px] 1440:max-w-[1350px] 2xl:max-w-[1440px] mx-auto min-h-screen px-1 text-white flex flex-col pb-12 md:pb-0">
        <button
          onClick={() => toggleOpenDialog(null)}
          className="box-content fixed self-end p-2 transition-colors border border-gray-400 rounded-full lg:p-3 top-5 right-3 w-fit group hover:bg-white"
        >
          <X className="size-4 lg:size-5 stroke-gray-400 group-hover:stroke-darkBg" />
        </button>
        <div className="flex flex-col justify-center flex-grow pt-16 md:pt-0 gap-14 md:gap-16 lg:gap-20">
          <div className="flex items-center justify-center w-full pt-8 md:pt-0">
            <div className="flex flex-wrap justify-center gap-6 text-xs xl:text-base mobile-m:px-2 sm:px-2 md:px-3 md:text-sm">
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Sort By:</p>
                <FilterDropdown
                  itemList={sortBys}
                  onSelectItem={(sortBy) => setSelectedSortBy(sortBy)}
                  labelMap={sortByLabels}
                  currentlySelected={selectedSortBy}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Type:</p>
                <FilterDropdown
                  itemList={formats}
                  onSelectItem={(format) => setSelectedFormat(format)}
                  labelMap={formatLabels}
                  currentlySelected={selectedFormat}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Status:</p>
                <FilterDropdown
                  itemList={statuses}
                  labelMap={anilistAnimeStatusLabels}
                  onSelectItem={(status) => setSelectedStatus(status)}
                  currentlySelected={selectedStatus}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Season:</p>
                <FilterDropdown
                  itemList={seasons}
                  onSelectItem={(season) => setSelectedSeason(season)}
                  labelMap={seasonLabels}
                  currentlySelected={selectedSeason}
                />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <p className="text-gray-400">Year:</p>
                <FilterDropdown
                  itemList={years}
                  onSelectItem={(year) => setSelectedYear(year)}
                  currentlySelected={selectedYear}
                />
              </div>
            </div>
          </div>
          <section className="flex flex-col items-center justify-center gap-16">
            <div className="flex flex-col items-center w-full gap-6 px-2">
              <p className="font-semibold text-gray-400 xl:text-2xl sm:text-base md:text-lg lg:text-xl">
                Genres
              </p>
              <div className="flex flex-wrap justify-center gap-x-2 max-w-[1100px] px-4 gap-y-3 md:gap-x-3 md:gap-y-4">
                {genres.map((genre) => (
                  <FilterPill
                    className="px-3 py-2 text-xs md:text-sm mobile-m:px-4 mobile-m:py-3 md:px-5 md:py-3 xl:text-base"
                    key={genre}
                    isSelected={selectedGenres.includes(genre)}
                    label={genre}
                    onClick={() =>
                      selectedGenres.includes(genre)
                        ? deselectGenre(genre)
                        : selectGenre(genre)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-5 text-sm lg:text-base">
              <button
                onClick={() => clearFilters()}
                className="px-4 py-3 text-gray-200 bg-gray-500 rounded-full lg:px-5 lg:py-3"
              >
                <p>Clear Filters</p>
              </button>
              <button
                onClick={() => applyFilters()}
                className="px-4 py-3 text-gray-200 transition-colors border rounded-full border-mainAccent hover:text-mainAccent lg:px-5 lg:py-3"
              >
                <p>Apply Filters</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
