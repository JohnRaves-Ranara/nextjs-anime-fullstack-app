import { ChevronRight } from "lucide-react";
import { Anime, Recommendation } from "@/utils/types/animeAnilist";
import AnimeCard from "./AnimeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/custom-carousel";

type HomePageProps = {
  isHomePage: true;
  animeList: Anime[];
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
        <div className="flex justify-between w-full">
          <p className="text-lg font-semibold sm:text-xl lg:text-2xl">
            {props.categoryName}
          </p>
          <button className="flex items-center gap-1 px-2 py-1 transition-all duration-300 border border-gray-400 rounded-full sm:px-3 sm:py-2 lg:px-4 group hover:border-mainAccent">
            <p className="text-xs transition-all duration-300 md:text-base group-hover:text-mainAccent whitespace-nowrap">
              See All
            </p>
            <ChevronRight className="transition-colors duration-300 size-4 md:size-5 lg:size-6 group-hover:stroke-mainAccent" />
          </button>
        </div>

        <Carousel
          opts={{
            slidesToScroll: 3,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {props.animeList.map((anime) => {
              return (
                <CarouselItem
                  key={anime.id}
                  className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6"
                >
                  <AnimeCard
                    isHomePage
                    key={anime.id}
                    anime={anime}
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
          <CarouselContent className="">
            {props.recommendations.map((recommendation) => {
              return (
                <CarouselItem
                  key={recommendation.id}
                  className="basis-1/3 mobile-m:basis-[30%] 570:basis-1/4 sm:basis-1/5 xl:basis-1/6"
                >
                  <AnimeCard
                    isHomePage={false}
                    key={recommendation.id}
                    recommendation={recommendation}
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
  }
}
