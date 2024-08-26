"use client";
import {
  useChunkEpisodes,
  useFetchAnimeInfoAnify,
  useFetchAnimeInfoAnilist,
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
    data: animeInfoAnify,
    isLoading: isAnimeInfoAnifyLoading,
    error: animeInfoAnifyError,
  } = useFetchAnimeInfoAnify(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId, true);

  const { data: chunkedEpisodes } = useChunkEpisodes(
    animeInfoAnify,
    animeInfoAnilist
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAnimeInfoAnifyLoading || isAnimeInfoAnilistLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          {isAnimeInfoAnifyLoading ? (
            <span className="font-semibold text-green-500">ANIFY</span>
          ) : (
            <span className="font-semibold text-blue-500">ANILIST</span>
          )}
        </p>
      </div>
    );
  }

  if (animeInfoAnifyError && animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (animeInfoAnify && animeInfoAnilist) {
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
          type={animeInfoAnilist.type ?? animeInfoAnify.format}
          defaultEpisodeImage={
            animeInfoAnify.coverImage ?? animeInfoAnilist.cover
          }
        />
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
