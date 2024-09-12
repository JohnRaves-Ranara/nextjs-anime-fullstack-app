"use client"

import { useSearchParams } from "next/navigation";
import AppliedFilterPill from "./AppliedFilterPill";
import {
  formatLabels,
  seasonLabels,
  sortByLabels,
  anilistAnimeStatusLabels,
} from "@/utils/variables/anime";

export default function AppliedFilters() {

  const searchParams = useSearchParams()
  const genres = searchParams.get("genres")
  const query = searchParams.get("query")
  const format = searchParams.get("format")
  const season = searchParams.get("season")
  const sortBy = searchParams.get("sortBy")
  const year = searchParams.get("year")
  const status = searchParams.get("status")

  return (
    <div className="flex w-full gap-4 overflow-x-auto hide-scrollbar sm:overflow-x-visible sm:flex-wrap">
      {query && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Query
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-emerald-500"
            label={query}
            onDelete={() => {}}
          />
        </div>
      )}
      {genres && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Genres
          </p>
          <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap">
            {genres.split(",").map((genre) => (
              <AppliedFilterPill
                key={genre}
                className="text-white bg-blue-500 rounded-full"
                label={genre}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      )}
      {sortBy && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Sort By
          </p>
          <AppliedFilterPill
            className="text-white bg-pink-600 rounded-full"
            label={sortByLabels[sortBy]}
            onDelete={() => {}}
          />
        </div>
      )}
      {format && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Format
          </p>
          <AppliedFilterPill
            className="text-white bg-orange-500 rounded-full"
            label={formatLabels[format]}
            onDelete={() => {}}
          />
        </div>
      )}
      {status && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Status
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-lime-600"
            label={anilistAnimeStatusLabels[status]}
            onDelete={() => {}}
          />
        </div>
      )}
      {year && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Year
          </p>
          <AppliedFilterPill
            className="text-white rounded-full bg-sky-500"
            label={year.toString()}
            onDelete={() => {}}
          />
        </div>
      )}
      {season && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 lg:text-base sm:text-sm">
            Season
          </p>
          <AppliedFilterPill
            className="text-white bg-teal-500 rounded-full"
            label={seasonLabels[season]}
            onDelete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
