"use client"

import { Anime } from "@/utils/types/animeAnilist";
import { useGlobalStore } from "@/utils/stores/globalStore";
import Link from "next/link";
import { Status } from "@/utils/types/animeAnilist";
import { statusLabels } from "@/utils/variables/anime";
import { Star } from "lucide-react";
import { getRatingScore } from "@/utils/functions/reusableFunctions";

type SearchDialogResultCardProps = {
    anime: Anime
}

export default function SearchDialogResultCard({anime}: SearchDialogResultCardProps){
    const { toggleOpenDialog } = useGlobalStore();
  return (
    <Link
      href={`/anime/${anime.id}`}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-3 py-2 hover:bg-gray-900/70"
    >
      <img
        src={anime.image}
        alt={anime.title.english ?? anime.title.romaji}
        className="object-cover size-full aspect-[3/4] w-[80px] rounded-md"
      />
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold">
          {anime.title.english ?? anime.title.romaji}
        </p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            {![
              Status.CANCELLED,
              Status.NOT_YET_RELEASED,
              Status.NotYetAired,
            ].includes(anime.status) && (
              <>
                <p>
                  {anime.totalEpisodes}&nbsp;
                  {anime.totalEpisodes > 1 ? "episodes" : "episode"}
                </p>
                <div className="bg-gray-400 rounded-full size-1" />
              </>
            )}
            <p>{statusLabels[anime.status]}</p>
          </div>
          {![
            Status.CANCELLED,
            Status.NOT_YET_RELEASED,
            Status.NotYetAired,
          ].includes(anime.status) && (
            <div className="flex items-center gap-[6px]">
              {anime.releaseDate && (
                <>
                  <p>{anime.releaseDate}</p>
                  <div className="bg-gray-400 rounded-full size-1" />
                </>
              )}
              <p>{anime.type}</p>
              <div className="bg-gray-400 rounded-full size-1" />

              <div className="flex items-center gap-1">
                <Star className="size-4" />
                <p>{getRatingScore(anime.rating * 0.1)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}