"use client";
import {
  useFetchPopularAnimes,
  useFetchTopRatedAnimes,
  useFetchTrendingAnimes,
} from "@/app/services/queries/animes";
import TrendingAnimesHeroCarousel from "./components/TrendingAnimeHeroCarousel";
import AnimeCategoryCarousel from "./components/AnimeCategoryCarousel";
import AnimeHomePageLoading from "./loading";

export default function AnimeHomePage() {
  const { data: trendingAnimes, isLoading: isTrendingAnimesLoading } =
    useFetchTrendingAnimes(17, 1);
  const { data: popularAnimes, isLoading: isPopularAnimesLoading } =
    useFetchPopularAnimes(12);

  const { data: topRatedAnimes, isLoading: isTopRatedAnimesLoading } =
    useFetchTopRatedAnimes(12);

  if (
    isTrendingAnimesLoading ||
    isPopularAnimesLoading ||
    isTopRatedAnimesLoading
  ) {
    return <AnimeHomePageLoading />;
  }

  if (trendingAnimes && popularAnimes && topRatedAnimes) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-dvw max-w-[100dvw]">
          <TrendingAnimesHeroCarousel
            animeList={trendingAnimes.results.slice(0, 5)}
          />
        </div>
        <div className="w-full pt-8 pb-24 space-y-10">
          <AnimeCategoryCarousel
            isHomePage
            animeList={trendingAnimes.results.slice(3)}
            categoryName="Trending Anime"
          />
          <AnimeCategoryCarousel
            isHomePage
            animeList={topRatedAnimes.results}
            categoryName="Top Rated"
          />
          <AnimeCategoryCarousel
            isHomePage
            animeList={popularAnimes.results}
            categoryName="All Time Popular"
          />
        </div>
      </div>
    );
  }
}
