"use client";
import {
  useChunkEpisodes,
  useFetchAnimeInfo
} from "@/app/services/queries/animes";
import AnimeHeroComponent from "./components/AnimeHeroComponent";
import Episodes from "./components/Episodes";
import { useEffect } from "react";
import AnimeCategoryCarousel from "@/app/anime/components/AnimeCategoryCarousel";

type AnimeInfoProps = {
  animeId: string;
};

export default function AnimeInfoPage({ animeId }: AnimeInfoProps) {
  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: isAnimeInfoError,
  } = useFetchAnimeInfo(animeId);

  const { data: chunkedEpisodes } = useChunkEpisodes(animeInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          Loading&nbsp;
          <span className="font-semibold text-green-500">ANIME</span>
          in client
        </p>
      </div>
    );
  }

  if (isAnimeInfoError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfo) {
    const { animeInfoAnify, animeInfoAnilist } = animeInfo;
    return (
      <main className="w-full pb-32">
        <AnimeHeroComponent
          title={
            animeInfoAnify.title.english ??
            animeInfoAnify.title.romaji ??
            animeInfoAnilist.title.english ??
            animeInfoAnilist.title.romaji
          }
          cover={animeInfoAnify.bannerImage ?? animeInfoAnilist.cover}
          image={animeInfoAnilist.image ?? animeInfoAnify.coverImage}
          id={animeInfoAnilist.id ?? animeInfoAnify.id}
          description={
            animeInfoAnilist.description ?? animeInfoAnify.description
          }
          genres={animeInfoAnilist.genres}
          status={animeInfoAnify.status ?? animeInfoAnilist.status}
          totalEpisodes={
            animeInfoAnify.totalEpisodes ?? animeInfoAnilist.totalEpisodes
          }
          type={animeInfoAnilist.type ?? animeInfoAnify.format}
          year={animeInfoAnilist.releaseDate ?? animeInfoAnify.year}
          rating={
            animeInfoAnify.rating.anilist ??
            animeInfoAnilist.rating! * 0.1 ??
            null
          }
        />
        <Episodes
          animeId={animeInfoAnify.id ?? animeInfoAnilist.id}
          isInfoPage
          chunkedEpisodes={chunkedEpisodes}
          replace={false}
          type={animeInfoAnilist.type}
          defaultEpisodeImage={
            animeInfoAnify.coverImage ?? animeInfoAnilist.cover
          }
        />
        {/* idk why, but one piece (only one piece) animeInfoAnilist.recommendations is undefined when 
        it reaches here, even if its not when you console.log it. So i need to render this only if
        animeInfoAnilist.recommendations exists */}
        {animeInfoAnilist.recommendations && (
          <AnimeCategoryCarousel
            isInfoPage
            isHomePage={false}
            recommendations={animeInfoAnilist.recommendations}
            categoryName="Recommendations"
          />
        )}
      </main>
    );
  }
}
