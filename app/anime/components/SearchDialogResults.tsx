"use client"

import { useGlobalStore } from "@/utils/stores/globalStore";
import { MultipleAnimeResponse } from "@/utils/types/animeAnilist";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchDialogResultCard from "./SearchDialogResultCard";
import Link from "next/link";
type SearchDialogResultsProps = {
  query: string;
  searchResults: MultipleAnimeResponse | undefined;
  isLoading: boolean;
  error: Error | null;
};

export default function SearchDialogResults({
  query,
  searchResults,
  isLoading,
  error,
}: SearchDialogResultsProps) {
  const { toggleOpenDialog } = useGlobalStore();

  if (isLoading) {
    return (
      <div className="grid w-full py-4 rounded-b-lg place-items-center text-[#f6f4f4] bg-gray-800">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid w-full py-4 place-items-center rounded-b-lg text-[#f6f4f4] bg-gray-800 text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (searchResults) {
    if (searchResults.results.length === 0) {
      return (
        <div className="flex flex-col w-full text-[#f6f4f4] rounded-b-lg bg-gray-800">
          <p>No results found for {query}</p>
        </div>
      );
    }
    return (
      <ScrollArea
        className={`w-full text-[#f6f4f4] rounded-b-lg bg-gray-800 ${
          searchResults.results.length <= 2 ? "h-auto" : "h-[300px]"
        } overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((anime) => (
            <SearchDialogResultCard key={anime.id} anime={anime} />
          ))}
        </ul>
        {searchResults.hasNextPage && (
          <Link
            href={{
              pathname: "/anime/catalog",
              query: { page: 1, query: query },
            }}
            onClick={() => toggleOpenDialog(null)}
            className="grid w-full py-3 mt-4 text-lg text-center place-items-center bg-mainAccent"
          >
            View all search results
          </Link>
        )}
      </ScrollArea>
    );
  }
}
