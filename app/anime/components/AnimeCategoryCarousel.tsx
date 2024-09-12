import { ChevronRight } from "lucide-react";
import { Anime, Recommendation, SortBy } from "@/utils/types/animeAnilist";
import AnimeCard from "./AnimeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";
import Link from "next/link";

type HomePageProps = {
  isHomePage: true;
  animeList: Anime[];
  seeAllSortBy: SortBy;
};

type NotHomePageProps = {
  isHomePage: false;
  recommendations: Recommendation[];
} & isInfoPage;

type isInfoPage = {
  isInfoPage: boolean;
};

type AnimeCategoryCarouselProps = {
  categoryName: string;
} & (HomePageProps | NotHomePageProps);

export default function AnimeCategoryCarousel(
  props: AnimeCategoryCarouselProps
) {

  if (props.isHomePage) {
    return (
      <div className="w-full px-3 pt-5 space-y-6 text-gray-400 lg:px-16 sm:px-6">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold sm:text-xl lg:text-2xl">
            {props.categoryName}
          </p>
          <Link
            href={`/anime/catalog?sortBy=${props.seeAllSortBy}`}
            className="flex items-center gap-1 px-3 py-2 transition-all duration-300 border border-gray-400 rounded-full lg:px-4 group hover:border-mainAccent"
          >
            <p className="text-xs transition-all duration-300 md:text-base group-hover:text-mainAccent whitespace-nowrap">
              See All
            </p>
            <ChevronRight className="transition-colors duration-300 size-4 md:size-5 lg:size-6 group-hover:stroke-mainAccent" />
          </Link>
        </div>

        <Carousel
          opts={{
            slidesToScroll: 3,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {props.animeList.map((anime) => {
              return (
                <CarouselItem
                  key={anime.id ?? anime.title ?? "no data"}
                  className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6"
                >
                  <AnimeCard
                    isHomePage
                    anime={anime}
                    className="min-h-fit max-h-[250px]"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            carouselType="category-carousel"
            className="absolute left-0 border-none bg-gradient-to-r from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
          />
          <CarouselNext
            carouselType="category-carousel"
            className="absolute right-0 border-none bg-gradient-to-l from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
          />
        </Carousel>
      </div>
    );
  } else {
    return (
      <div
        className={`w-full pt-16 space-y-6 text-gray-400 ${props.isInfoPage ? "px-2 lg:px-12 xl:px-16 sm:px-5 md:px-8" : "px-2 lg:px-16 sm:px-3"}`}
      >
        <p className="text-lg font-semibold sm:text-xl lg:text-2xl">
          {props.categoryName}
        </p>

        <Carousel
          opts={{
            slidesToScroll: 3,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {props.recommendations.map((recommendation, i) => {
              return (
                recommendation.id && (
                  <CarouselItem
                    key={recommendation.id ?? recommendation.title ?? i}
                    className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6"
                  >
                    <AnimeCard
                      isHomePage={false}
                      recommendation={recommendation}
                      className="min-h-fit max-h-[250px]"
                    />
                  </CarouselItem>
                )
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            carouselType="category-carousel"
            className="absolute left-0 border-none bg-gradient-to-r from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
          />
          <CarouselNext
            carouselType="category-carousel"
            className="absolute right-0 border-none bg-gradient-to-l from-darkBg from-10% via-darkBg/80 via-50% to-transparent"
          />
        </Carousel>
      </div>
    );
  }
}
