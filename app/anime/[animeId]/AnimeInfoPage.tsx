"use client";
import {
  useFetchAnimeEpisodes,
  useFetchAnimeInfoAnilist,
} from "@/app/services/queries/animes";
import AnimeHeroComponent from "./components/AnimeHeroComponent";
import Episodes from "./components/Episodes";
import { useEffect } from "react";
import AnimeCategoryCarousel from "@/app/anime/components/AnimeCategoryCarousel";
import AnimeInfoLoading from "./loading";

type AnimeInfoProps = {
  animeId: string;
};

export default function AnimeInfoPage({ animeId }: AnimeInfoProps) {
  const episodesQuery = useFetchAnimeEpisodes(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoAnilistLoading) {
    return <AnimeInfoLoading />;
  }

  if (animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfoAnilist) {
    return (
      <main className="w-full pb-32">
        <AnimeHeroComponent
          episodesQuery={episodesQuery}
          animeId={animeId}
          title={
            animeInfoAnilist?.title.english ?? animeInfoAnilist?.title.romaji
          }
          cover={animeInfoAnilist?.cover}
          image={animeInfoAnilist?.image}
          description={animeInfoAnilist?.description}
          genres={animeInfoAnilist?.genres}
          status={animeInfoAnilist?.status}
          totalEpisodes={animeInfoAnilist?.totalEpisodes}
          type={animeInfoAnilist?.type}
          year={animeInfoAnilist?.releaseDate}
          rating={
            animeInfoAnilist?.rating! * 0.1 ??
            // anifyEpisodesQuery?.data?.rating.anilist
            // ??
            null
          }
        />
        <Episodes
          defaultEpisodeImage={
            animeInfoAnilist?.image ?? animeInfoAnilist?.cover
          }
          episodesQuery={episodesQuery}
          isInfoPage
          animeId={animeId}
          replace={false}
          type={animeInfoAnilist?.type}
        />
        {animeInfoAnilist?.recommendations &&
          animeInfoAnilist?.recommendations.length !== 0 && (
            <AnimeCategoryCarousel
              isInfoPage
              isHomePage={false}
              recommendations={animeInfoAnilist?.recommendations}
              categoryName="Recommendations"
            />
          )}
      </main>
    );
  }
}
