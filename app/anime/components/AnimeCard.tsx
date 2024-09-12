import { Anime, Recommendation, Status } from "@/utils/types/animeAnilist";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HomePageProps = {
  isHomePage: true;
  anime: Anime;
};

type NotHomePageProps = {
  isHomePage: false;
  recommendation: Recommendation;
};

type AnimeCardProps = {
  className?: string;
} & (HomePageProps | NotHomePageProps);

export default function AnimeCard(props: AnimeCardProps) {
  if (props.isHomePage) {
    return (
      <Link href={`/anime/${props.anime.id}`} className="space-y-2 group">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl",
            props.className
          )}
        >
          {props.anime.image && (
            <>
              <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
              <img
                loading="lazy"
                src={props.anime.image}
                className="object-cover transition-all duration-300 size-full group-hover:scale-105"
                alt={props.anime.title.english}
              />
            </>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {props.anime.title.english ?? props.anime.title.romaji}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {[Status.NotYetAired, Status.NOT_YET_RELEASED].includes(
              props.anime.status
            ) ? (
              <p className="line-clamp-1">Not yet aired</p>
            ) : [Status.CANCELLED, Status.Cancelled].includes(
                props.anime.status
              ) ? (
              <p className="line-clamp-1">Cancelled</p>
            ) : (
              <>
                {props.anime.type && <p>{props.anime.type}</p>}
                {props.anime.releaseDate && props.anime.type && (
                  <div className="bg-gray-400 rounded-full size-1"></div>
                )}
                {props.anime.releaseDate && <p>{props.anime.releaseDate}</p>}
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/anime/${props.recommendation.id.toString()}`}
      className="space-y-2 group"
    >
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl",
          props.className
        )}
      >
        {props.recommendation.image && (
          <>
            <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
            <img
              loading="lazy"
              src={props.recommendation.image}
              className="object-cover transition-all duration-300 size-full group-hover:scale-105"
              alt={props.recommendation.title.english}
            />
          </>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#E0E0E0] line-clamp-2">
          {props.recommendation.title.english ??
            props.recommendation.title.romaji}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {props.recommendation.status === Status.NotYetAired ||
          props.recommendation.status === Status.NOT_YET_RELEASED ? (
            <p className="line-clamp-1">Not yet aired</p>
          ) : (
            <>
              <p>{props.recommendation.type}</p>
              <div className="bg-gray-400 rounded-full size-1"></div>
              {props.recommendation.type === "MOVIE" ? (
                <p className="line-clamp-1">MOVIE</p>
              ) : (
                <>
                  <p className="line-clamp-1 lg:hidden">
                    {props.recommendation.episodes}{" "}
                    {props.recommendation.episodes === 1 ? "ep" : "eps"}
                  </p>
                  <p className="hidden line-clamp-1 lg:block">
                    {props.recommendation.episodes}{" "}
                    {props.recommendation.episodes === 1
                      ? "episode"
                      : "episodes"}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
