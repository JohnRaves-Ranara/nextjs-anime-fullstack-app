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
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl min-h-fit max-h-[250px]">
          {props.anime.image && (
            <>
              <div className="absolute z-10 hidden transition-all opacity-0 lg:grid place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
                <div className="grid bg-white rounded-full size-12 place-items-center">
                  <svg
                    className="size-[50%]"
                    fill="#c026d3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                </div>
              </div>
              <img
                loading="lazy"
                src={props.anime.image}
                className="object-cover transition-all size-full group-hover:scale-105"
                alt={props.anime.title.english}
              />
            </>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#E0E0E0] line-clamp-2">
            {props.anime.title.english ?? props.anime.title.romaji}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {props.anime.status === Status.NotYetAired ||
            props.anime.status === Status.NOTYETRELEASED ? (
              <p className="line-clamp-1">Not yet aired</p>
            ) : (
              <>
                <p>{props.anime.releaseDate}</p>
                <div className="bg-gray-400 rounded-full size-1"></div>
                {props.anime.type === "MOVIE" ? (
                  <p className="line-clamp-1">MOVIE</p>
                ) : (
                  <>
                    <p className="line-clamp-1 lg:hidden">
                      {props.anime.totalEpisodes}{" "}
                      {props.anime.totalEpisodes === 1 ? "ep" : "eps"}
                    </p>
                    <p className="hidden line-clamp-1 lg:block">
                      {props.anime.totalEpisodes}{" "}
                      {props.anime.totalEpisodes === 1 ? "episode" : "episodes"}
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
  return props.recommendation.id ? (
    <Link
      href={`/anime/${props.recommendation.id.toString()}`}
      className="space-y-2 group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl min-h-fit max-h-[250px]">
        {props.recommendation.image && (
          <>
            <div className="absolute z-10 hidden transition-all opacity-0 lg:grid place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
              <div className="grid bg-white rounded-full size-12 place-items-center">
                <svg
                  className="size-[50%]"
                  fill="#c026d3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
              </div>
            </div>
            <img
              loading="lazy"
              src={props.recommendation.image}
              className="object-cover transition-all size-full group-hover:scale-105"
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
          props.recommendation.status === Status.NOTYETRELEASED ? (
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
  ) : (
    <div className="space-y-2 group">
      <div className="grid text-center px-3 place-items-center aspect-[3/4] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl min-h-fit max-h-[250px]">
        <p className="text-sm">Sorry, we cannot load this anime at this time.</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-white pt-1">
          NO DATA
        </p>
      </div>
    </div>
  );
}
