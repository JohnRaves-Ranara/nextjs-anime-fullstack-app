"use client";

import { useEffect, useRef, useState } from "react";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useSearchAnime } from "@/app/services/queries/animes";
import SearchDialogResults from "./SearchDialogResults";
import { cn } from "@/lib/utils";

export default function SearchDialog() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const router = useRouter();
  const { toggleOpenDialog } = useGlobalStore();

  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchAnime(debouncedSearch.trim(), debouncedSearch.trim().length > 0);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleEnterPress: React.FormEventHandler = () => {
    toggleOpenDialog(null);
    router.push(`/anime/catalog?query=${search.trim()}`);
  };

  return (
    <div className="w-[800px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim().length >= 1) {
            handleEnterPress(e);
          }
        }}
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
          type="text"
          className={cn(
            "focus:outline-none p-5 text-lg placeholder-gray-400 font-medium text-[#f6f4f4] bg-gray-800 rounded-lg size-full",
            debouncedSearch ? "rounded-b-none" : ""
          )}
          placeholder="Search anime..."
        />
        <SearchDialogResults
          query={debouncedSearch.trim()}
          searchResults={searchResults}
          isLoading={isSearchResultsLoading}
          error={searchResultsError}
        />
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}
