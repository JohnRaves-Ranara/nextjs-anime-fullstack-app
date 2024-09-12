"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useRouter } from "next/navigation";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect } from "react";
import {
  useChunkEpisodes,
  useEpisodeInfo,
  useFetchAnimeEpisodes,
  useFetchAnimeInfoAnilist,
  useFetchEpisodeStreamLinks,
} from "@/app/services/queries/animes";
import Episodes from "../components/Episodes";
import AnimeCategoryCarousel from "../../components/AnimeCategoryCarousel";
import AnimeWatchPageLoading from "./loading";

type AnimeWatchPageProps = {
  animeId: string;
  episodeId: string;
};

export default function AnimeWatchPage({
  animeId,
  episodeId,
}: AnimeWatchPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!episodeId || episodeId === "") {
      router.push(`/anime/${animeId}`);
    }
  }, [animeId, episodeId, router]);

  const {
    data: episodeStreamLinks,
    isLoading: isEpisodeStreamLinksLoading,
    error: episodeStreamLinksError,
  } = useFetchEpisodeStreamLinks(episodeId);

  const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId);

  const { data: chunkedEpisodes } = useChunkEpisodes(episodesQuery.data);

  const { data: episodeInfo } = useEpisodeInfo(episodeId, chunkedEpisodes);

  if (isEpisodeStreamLinksLoading || isAnimeInfoAnilistLoading) {
    return <AnimeWatchPageLoading />;
  }

  if (episodeStreamLinksError && animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (episodeStreamLinks && animeInfoAnilist) {
    return (
      <main className="flex flex-col pb-32">
        <section className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row lg:px-16">
          <div className="w-full">
            <div className="w-full aspect-video">
              <MediaPlayer
                playsInline
                className="size-full"
                // title="Sprite Fight"
                src={
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "backup"
                  )?.url ??
                  episodeStreamLinks.sources.find(
                    (source) => source.quality === "default"
                  )?.url
                }
                streamType="on-demand"
                volume={0.08}
              >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
            <div className="flex flex-col w-full gap-1 px-2 mt-2 sm:px-3 lg:px-0">
              <p className="text-lg font-bold sm:text-xl line-clamp-1">
                {animeInfoAnilist?.title?.english ??
                  animeInfoAnilist?.title?.romaji ??
                  ""}
              </p>
              <p className="text-lg font-semibold text-gray-400 sm:text-xl">
                {episodeInfo ? `Episode ${episodeInfo.number}` : "Loading..."}
              </p>
              {episodeInfo && (
                <p className="font-medium sm:text-lg line-clamp-1">
                  {episodeInfo.title}
                </p>
              )}
            </div>
          </div>
          <Episodes
            episodesQuery={episodesQuery}
            isInfoPage={false}
            animeId={animeId}
            replace
            type={animeInfoAnilist?.type}
            defaultEpisodeImage={
              animeInfoAnilist?.cover ?? animeInfoAnilist?.image
            }
          />
        </section>
        {animeInfoAnilist?.recommendations && (
          <AnimeCategoryCarousel
            isInfoPage={false}
            isHomePage={false}
            categoryName="Recommendations"
            recommendations={animeInfoAnilist?.recommendations}
          />
        )}
      </main>
    );
  }
}
