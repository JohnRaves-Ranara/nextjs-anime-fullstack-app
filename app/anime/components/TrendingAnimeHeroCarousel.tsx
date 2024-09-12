import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/custom-carousel";
  import { Anime } from "@/utils/types/animeAnilist";
  import TrendingCarouselItem from "./TrendingCarouselItem";
  
  type TrendingAnimeCarouselProps = {
    animeList: Anime[];
  };
  
  export default function TrendingAnimesHeroCarousel({
    animeList,
  }: TrendingAnimeCarouselProps) {
    return (
      <Carousel>
        <CarouselContent>
          {animeList.map((anime, i) => {
            return (
              <CarouselItem
                key={i}
                className="relative w-full h-[380px] mobile-l:h-[400px] sm:h-[420px] md:h-[450px] lg:h-[500px] xl:h-[525px]"
              >
                <TrendingCarouselItem
                  image={anime.image}
                  cover={anime.cover}
                  description={anime.description}
                  title={anime.title.english}
                  animeId={anime.id}
                  trendingRank={i + 1}
                />
                <div className="absolute inset-0 w-full left-1/2 ml-[-50vw] h-full">
                  <div className="absolute bg-black/60 size-full backdrop-blur-[1px]"></div>
                  <div className="absolute bg-gradient-to-t from-darkBg from-0% to-transparent to-80% size-full"></div>
                  <img
                    src={anime.cover ?? anime.image}
                    className="object-cover object-center size-full"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious carouselType="hero-carousel" className="absolute left-0 ml-2 border-none md:ml-5 xl:ml-6 bg-black/40 hover:bg-mainAccent" />
        <CarouselNext carouselType="hero-carousel" className="absolute right-0 mr-2 border-none md:mr-5 xl:mr-6 bg-black/40 hover:bg-mainAccent" />
      </Carousel>
    );
  }
  