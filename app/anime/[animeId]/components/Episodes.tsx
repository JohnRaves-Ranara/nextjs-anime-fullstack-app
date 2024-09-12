import { ChevronDown } from "lucide-react";
import EpisodeCard from "./EpisodeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Data } from "@/utils/types/animeAnify";
import { Episode } from "@/utils/types/animeAnilist";
import { AnimeInfoAnizip } from "@/utils/types/animeAnizip";
import { useChunkEpisodes } from "@/app/services/queries/animes";
import { UseQueryResult } from "@tanstack/react-query";

type EpisodeProps = {
  animeId: string | undefined;
  type: string | undefined;
  replace: boolean;
  isInfoPage: boolean;
  defaultEpisodeImage: string | undefined;
  episodesQuery: UseQueryResult<
    {
      anifyEps: Data[];
      anilistEps: Episode[];
      anizipEps: AnimeInfoAnizip;
    },
    Error
  >;
};

export default function Episodes({
  animeId,
  type,
  replace,
  isInfoPage,
  defaultEpisodeImage,
  episodesQuery,
}: EpisodeProps) {
  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = episodesQuery;

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(episodes);

  if (isEpisodesLoading || isChunkEpisodesLoading) {
    return (
      <div className="flex flex-col px-3 pt-8 pb-16 space-y-6 text-[#f6f4f4] sm:px-5 md:px-8 lg:px-12 xl:px-16">
        <p className="text-lg font-semibold lg:text-xl">Episodes</p>
        <div className="self-center py-12 text-xl">Loading episodes...</div>
      </div>
    );
  }

  if (episodesError) {
    return (
      <div className="flex flex-col px-3 pt-8 pb-16 space-y-6 text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16">
        <p className="font-semibold text-lg lg:text-xl text-[#f6f4f4]">
          Episodes
        </p>
        <div className="self-center py-12 text-xl">
          There was an error fetching episodes for this anime, please try again
          later.
        </div>
      </div>
    );
  }

  if (episodes && chunkedEpisodes) {
    if (isInfoPage) {
      return (
        <div className="flex flex-col w-full px-2 pt-8 space-y-6 text-sm text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16 lg:text-base">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:text-xl font-semibold text-[#f6f4f4]">
              Episodes
            </p>
            {chunkedEpisodes.length > 1 && (
              <button className="flex items-center gap-3 px-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
                <p className="duration-300 group-hover:text-mainAccent">
                  {chunkedEpisodes
                    ? `${chunkedEpisodes[0].startEp} - ${chunkedEpisodes[0].endEp}`
                    : "0-0"}
                </p>
                <ChevronDown className="duration-300 size-6 group-hover:stroke-mainAccent" />
              </button>
            )}
          </div>
          <div className="h-[360px] lg:h-auto overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-6">
              {chunkedEpisodes[0].episodes.map((episode, i) => {
                return (
                  <EpisodeCard
                    replace={replace}
                    animeId={animeId!}
                    type={type}
                    episodeId={episode.id}
                    image={episode.image ?? defaultEpisodeImage}
                    title={episode.title}
                    number={episode.number}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="lg:w-[520px] flex flex-col w-full px-2 pt-8 lg:pt-0 space-y-6 text-sm text-gray-400 sm:px-3 lg:px-0 lg:text-base">
        <div className="flex items-center justify-between">
          <p className="text-lg md:text-xl font-semibold text-[#f6f4f4]">
            Episodes
          </p>
          {chunkedEpisodes.length > 1 && (
            <button className="flex items-center gap-3 px-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
              <p className="duration-300 group-hover:text-mainAccent">
                {chunkedEpisodes
                  ? `${chunkedEpisodes[0].startEp} - ${chunkedEpisodes[0].endEp}`
                  : "0-0"}
              </p>
              <ChevronDown className="duration-300 size-6 group-hover:stroke-mainAccent" />
            </button>
          )}
        </div>
        <ScrollArea
          className={`h-[360px] lg:h-[650px] ${
            chunkedEpisodes[0].episodes.length < 30 ? "lg:h-auto" : ""
          } overflow-y-auto`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-3 gap-y-4">
            {chunkedEpisodes[0].episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  replace={replace}
                  animeId={animeId!}
                  type={type}
                  episodeId={episode.id}
                  image={episode.image ?? defaultEpisodeImage}
                  title={episode.title}
                  number={episode.number}
                  key={i}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }
  return (
    <div className="flex flex-col px-3 pt-8 pb-16 space-y-6 text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16">
      <p className="font-semibold text-lg lg:text-xl text-[#f6f4f4]">
        Episodes
      </p>
      <div className="self-center py-12 text-xl">No Episodes available</div>
    </div>
  );
}
