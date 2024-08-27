"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect } from "react";
import {
  useChunkEpisodes,
  useEpisodeInfo,
  useFetchAnimeInfo,
  useFetchEpisodeStreamLinks,
} from "@/app/services/queries/animes";
import Episodes from "../components/Episodes";
import AnimeCategoryCarousel from "../../components/AnimeCategoryCarousel";

type AnimeWatchPageProps = {
  animeId: string;
};

export default function AnimeWatchPage({ animeId }: AnimeWatchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const episodeId = searchParams.get("id");

  useEffect(() => {
    if (!episodeId || episodeId === "") {
      router.push(`/anime/${animeId}`);
    }
  }, []);

  const {
    data: episodeStreamLinks,
    isLoading: isEpisodeStreamLinksLoading,
    error: episodeStreamLinksError,
  } = useFetchEpisodeStreamLinks(episodeId);

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfo(animeId as string);

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(animeInfo);

  const { data: episodeInfo, isLoading: isEpisodeInfoLoading } = useEpisodeInfo(
    episodeId,
    chunkedEpisodes
  );

  if (
    isEpisodeStreamLinksLoading ||
    isAnimeInfoLoading ||
    isChunkEpisodesLoading ||
    isEpisodeInfoLoading
  ) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-cyan-500">EPISODE</span>
          in client
        </p>
      </div>
    );
  }
  if (episodeStreamLinksError || animeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching this episode.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (episodeStreamLinks && animeInfo && chunkedEpisodes && episodeInfo) {
    const { animeInfoAnify, animeInfoAnilist } = animeInfo;
    return (
      <div className="flex flex-col pb-32">
        <div className="flex flex-col w-full gap-2 pt-20 lg:pt-24 lg:gap-6 lg:flex-row lg:px-16">
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
            <div className="w-full px-2 mt-2 sm:px-3 lg:px-0">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold sm:text-xl line-clamp-1">
                  {/* idk why, but one piece (only one piece) animeInfoAnilist.title 
                   is undefined when it reaches here, even if its not, when you console.log it. 
                   So i need to render this only if animeInfoAnilist.title exists */}
                  {animeInfoAnilist.title && animeInfoAnify.title
                    ? animeInfoAnilist.title.english ??
                      animeInfoAnify.title.english
                    : ""}
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
          </div>
          <Episodes
            isInfoPage={false}
            animeId={animeInfoAnify?.id ?? animeInfoAnilist?.id}
            replace
            type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
            chunkedEpisodes={chunkedEpisodes}
            defaultEpisodeImage={
              animeInfoAnify?.coverImage ?? animeInfoAnilist?.cover
            }
          />
        </div>
        {/* idk why, but one piece (only one piece) animeInfoAnilist.recommendations is undefined when 
        it reaches here, even if its not, when you console.log it. So i need to render this only if
        animeInfoAnilist.recommendations exists */}
        {animeInfoAnilist.recommendations && (
          <AnimeCategoryCarousel
            isInfoPage={false}
            isHomePage={false}
            categoryName="Recommendations"
            recommendations={animeInfoAnilist.recommendations}
          />
        )}
      </div>
    );
  }
}
